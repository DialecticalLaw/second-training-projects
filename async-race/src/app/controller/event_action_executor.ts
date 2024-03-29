import { CarAbortControllers, UpdateCarResponse, UpdateCurrentPage } from '../../interfaces';
import { Model } from '../model/model';
import {
  nextBtn,
  prevBtn
} from '../view/components/garage/garage_switch_block/garage_switch_block';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GarageOptionsView } from '../view/garage_view/garage_options_view';

export class EventActionExecutor {
  private model: Model;

  private aborts: CarAbortControllers;

  private executedAborts: string[];

  constructor(model: Model) {
    this.model = model;
    this.aborts = {};
    this.executedAborts = [];
  }

  public static handleSelectRequest(garageOptionsView: GarageOptionsView): void {
    const allSelectButtons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll('.garage__car_select')
    );

    allSelectButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        GarageInfoView.selectCar(event);
        garageOptionsView.toggleUpdateBtnValidity(true);
      });
    });
  }

  public handlePaginationRequest(updateCurrentPage: UpdateCurrentPage): void {
    prevBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      this.model.currentPage -= 1;
      await updateCurrentPage();
    });

    nextBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      this.model.currentPage += 1;
      await updateCurrentPage();
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
        const carCard: HTMLElement | null | undefined = eventTarget.parentElement?.parentElement;
        const adjacentBtn: Element | null = eventTarget.nextElementSibling;
        if (!carCard || !adjacentBtn || !(adjacentBtn instanceof HTMLButtonElement))
          throw new Error('wrong adjacentButton or carCard');

        const id: string = carCard.id;
        GarageInfoView.updateButtonsState({ btn: button, status: false });
        const startedResult: UpdateCarResponse = await Model.updateCarStatus(id, 'started');
        if (typeof startedResult !== 'object' || !('distance' in startedResult))
          throw new Error('wrong startedResult');

        const abortController: AbortController = new AbortController();
        this.aborts[id] = abortController;
        GarageInfoView.updateButtonsState({ btn: adjacentBtn, status: true });
        GarageInfoView.moveCar(id, startedResult);

        const driveResponse: UpdateCarResponse = await Model.updateCarStatus(id, 'drive', {
          btn: eventTarget,
          adjacentBtn,
          abort: abortController
        });
        if (driveResponse && 'success' in driveResponse) this.executedAborts.push(id);
      });
    });
  }

  public handleBrakeRequest(): void {
    const allBrakeButtons = Array.from(
      document.querySelectorAll('.garage__car_brake')
    ) as HTMLButtonElement[];

    allBrakeButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();
        const eventTarget: EventTarget | null = event.target;
        if (!(eventTarget instanceof HTMLButtonElement)) throw new Error('wrong event target');
        const carCard: HTMLElement | null | undefined = eventTarget.parentElement?.parentElement;
        const adjacentBtn: Element | null = eventTarget.previousElementSibling;
        if (!carCard || !adjacentBtn || !(adjacentBtn instanceof HTMLButtonElement))
          throw new Error('wrong adjacentButton or carCard');

        const id: string = carCard.id;

        if (this.executedAborts.includes(id)) {
          GarageInfoView.updateButtonsState({ btn: eventTarget, status: false });
          GarageInfoView.updateButtonsState({ btn: adjacentBtn, status: true });
          GarageInfoView.moveCar(id, 'reset');
          this.executedAborts = this.executedAborts.filter((arrId: string) => arrId !== id);
          this.executedAborts.includes(id);
        } else this.aborts[id].abort();
      });
    });
  }
}
