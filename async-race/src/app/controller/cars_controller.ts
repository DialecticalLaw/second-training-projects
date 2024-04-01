import {
  CRUD,
  CRUDWinnersResult,
  CarAbortControllers,
  CarProps,
  PageMode,
  UpdateCarResponse,
  UpdateCurrentPage,
  ViewType
} from '../../interfaces';
import { Model } from '../model/model';
import { raceBtn, resetBtn } from '../view/components/garage/garage_options/garage_options';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import {
  switchGarageMode,
  toggleBtnDriveValidity,
  updateButtonState
} from '../view/garage_view/garage_view';
import { isCarsResets } from './addition_actions_controller';

function getCardInfo(eventTarget: HTMLButtonElement): [string, HTMLButtonElement] {
  const carCard: HTMLElement | null | undefined = eventTarget.parentElement?.parentElement;
  const adjacentBtn: Element | null = eventTarget.nextElementSibling;
  if (!carCard || !adjacentBtn || !(adjacentBtn instanceof HTMLButtonElement))
    throw new Error('wrong adjacentButton or carCard');

  const id: string = carCard.id;
  return [id, adjacentBtn];
}

export class CarsController {
  private model: Model;

  private aborts: CarAbortControllers;

  private executedAborts: string[];

  private readyCars: Promise<CarProps>[];

  private arrivedCars: string[];

  private stoppedCarsCount: number;

  constructor(model: Model) {
    this.model = model;
    this.aborts = {};
    this.executedAborts = [];
    this.readyCars = [];
    this.stoppedCarsCount = 0;
    this.arrivedCars = [];
    document.addEventListener('carstopped', () => {
      this.stoppedCarsCount += 1;
    });
  }

  public handleGasRequest(): void {
    const allGasButtons = Array.from(
      document.querySelectorAll('.garage__car_gas')
    ) as HTMLButtonElement[];

    allGasButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();
        const eventTarget: EventTarget | null = event.target;
        if (!(eventTarget instanceof HTMLButtonElement)) throw new Error('wrong event target');
        const [id, adjacentBtn]: [string, HTMLButtonElement] = getCardInfo(eventTarget);

        updateButtonState({ btn: button, status: false });
        updateButtonState({ btn: raceBtn, status: false });
        toggleBtnDriveValidity(false);
        const startedResult = Model.updateCarStatus(id, 'started') as Promise<CarProps>;
        this.readyCars.push(startedResult);

        const startedResponse: CarProps = await startedResult;
        const abortController: AbortController = new AbortController();
        this.aborts[id] = abortController;
        updateButtonState({ btn: adjacentBtn, status: true });
        GarageInfoView.moveCar(id, startedResponse);

        const driveResponse: UpdateCarResponse = await Model.updateCarStatus(id, 'drive', {
          btn: eventTarget,
          adjacentBtn,
          abort: abortController
        });
        if (driveResponse && 'success' in driveResponse) {
          this.executedAborts.push(id);
          if (driveResponse.success) this.stoppedCarsCount += 1;
          if (driveResponse.success === true) this.arrivedCars.push(id);
        }
      });
    });
  }

  public handleBrakeRequest(): void {
    const allBrakeButtons = Array.from(
      document.querySelectorAll('.garage__car_brake')
    ) as HTMLButtonElement[];

    allBrakeButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        const eventTarget: EventTarget | null = event.target;
        if (!(eventTarget instanceof HTMLButtonElement)) throw new Error('wrong event target');
        const carCard: HTMLElement | null | undefined = eventTarget.parentElement?.parentElement;
        const adjacentBtn: Element | null = eventTarget.previousElementSibling;
        if (!carCard || !adjacentBtn || !(adjacentBtn instanceof HTMLButtonElement))
          throw new Error('wrong adjacentButton or carCard');

        const id: string = carCard.id;

        if (this.executedAborts.includes(id)) {
          updateButtonState({ btn: eventTarget, status: false });
          updateButtonState({ btn: adjacentBtn, status: true });
          if (isCarsResets()) {
            updateButtonState({ btn: raceBtn, status: true });
            toggleBtnDriveValidity(true);
          }

          GarageInfoView.moveCar(id, 'reset');
          this.executedAborts = this.executedAborts.filter((arrId: string) => arrId !== id);
          this.executedAborts.includes(id);
          this.stoppedCarsCount += 1;
        } else {
          this.aborts[id].abort();
        }
      });
    });
  }

  public handleRaceRequest(
    garageInfoView: GarageInfoView,
    updateCurrentPage: UpdateCurrentPage
  ): void {
    raceBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      this.stoppedCarsCount = 0;
      this.arrivedCars = [];
      this.readyCars = [];
      switchGarageMode(PageMode.Race);
      updateButtonState({ btn: raceBtn, status: false });
      const allActiveGasButtons: HTMLButtonElement[] = Array.from(
        document.querySelectorAll('.garage__car_gas:not(.disabled)')
      );

      allActiveGasButtons.forEach((button: HTMLButtonElement) => {
        const clickEvent = new Event('click');
        button.dispatchEvent(clickEvent);
      });

      await Promise.all(this.readyCars);
      updateButtonState({ btn: resetBtn, status: true });
      const carsCount: number = Array.from(document.querySelectorAll('.garage__car_card')).length;
      const raceResult: boolean = await this.waitForFirstCars(carsCount);
      if (raceResult === true) {
        const winnerId: string = this.arrivedCars[0];
        await this.saveWinner(winnerId);
        garageInfoView.showWinner(winnerId);
        await updateCurrentPage(ViewType.WinnersCurrent);
      } else {
        garageInfoView.showWinner(false);
      }
      this.readyCars = [];
      this.arrivedCars = [];
    });
  }

  private async saveWinner(id: string): Promise<void> {
    const receivedWinner: CRUDWinnersResult = await this.model.CRUDCarsWinners(CRUD.Read, {
      id
    });

    const winnerCarIcon: HTMLElement | null = document.querySelector(
      `[id="${id}"] .garage__car_icon`
    );
    if (!winnerCarIcon) throw new Error('car icon is undefined');
    const carIconTransition: string = winnerCarIcon.style.transitionDuration;
    const time: string = Number(carIconTransition.slice(0, carIconTransition.length - 1)).toFixed(
      2
    );
    if (receivedWinner !== undefined) {
      if (!('wins' in receivedWinner) || !receivedWinner.wins)
        throw new Error('receivedWinner is wrong');

      if (receivedWinner.time && receivedWinner.time > Number(time)) {
        await this.model.CRUDCarsWinners(CRUD.Update, {
          id,
          time: Number(time),
          wins: receivedWinner.wins + 1
        });
      } else {
        await this.model.CRUDCarsWinners(CRUD.Update, {
          id,
          time: receivedWinner.time,
          wins: receivedWinner.wins + 1
        });
      }
    } else {
      await this.model.CRUDCarsWinners(CRUD.Create, { id, time: Number(time), wins: 1 });
    }
  }

  public handleResetRequest(garageInfoView: GarageInfoView): void {
    resetBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      updateButtonState({ btn: resetBtn, status: false });

      const carsCount: number = Array.from(document.querySelectorAll('.garage__car_card')).length;
      const allBrakeButtons: HTMLButtonElement[] = Array.from(
        document.querySelectorAll('.garage__car_brake')
      );

      allBrakeButtons.forEach((button: HTMLButtonElement) => {
        const clickEvent = new Event('click');
        button.dispatchEvent(clickEvent);
      });
      await this.waitForStoppedCars(carsCount);

      switchGarageMode(PageMode.Default);
      updateButtonState({ btn: raceBtn, status: true });
      garageInfoView.hideWinner();
      setTimeout(() => {
        garageInfoView.hideWinner(); // as a precaution :)
      }, 500);
      this.stoppedCarsCount = 0;
    });
  }

  private async waitForStoppedCars(count: number): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    if (this.stoppedCarsCount < count) {
      return this.waitForStoppedCars(count);
    }
    return undefined;
  }

  private async waitForFirstCars(count: number): Promise<boolean> {
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    if (this.arrivedCars.length) return true;
    if (this.stoppedCarsCount === count) return false;
    return this.waitForFirstCars(count);
  }
}
