import {
  CRUD,
  CRUDGarageResult,
  CRUDWinnersResult,
  SortType,
  UpdateCurrentPage,
  ViewType
} from '../../interfaces';
import { Model } from '../model/model';
import { switchPageView } from '../view/app_view';
import { updateBtn } from '../view/components/garage/garage_options/garage_options';
import {
  nextBtn,
  prevBtn
} from '../view/components/garage/garage_switch_block/garage_switch_block';
import { selectGarageBtn, selectWinnersBtn } from '../view/components/header/header';
import {
  nextWinnersBtn,
  prevWinnersBtn
} from '../view/components/winners/winners_switch_page/winners_switch_block';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GaragePageSwitchView } from '../view/garage_view/garage_switch_page_view';
import { updateButtonState } from '../view/garage_view/garage_view';
import { WinnersPageSwitchView } from '../view/winners_view/winners_switch_page_view';

export function isCarsResets(): boolean {
  const allBrakeButtons = Array.from(
    document.querySelectorAll('.garage__car_brake')
  ) as HTMLButtonElement[];

  const activeBrakeButton = allBrakeButtons.find(
    (button: HTMLButtonElement) => !button.classList.contains('disabled')
  );

  if (activeBrakeButton) {
    return false;
  }
  return true;
}

export class AdditionController {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public static handleSelectRequest(): void {
    const allSelectButtons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll('.garage__car_select')
    );

    allSelectButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        GarageInfoView.selectCar(event);
        updateButtonState({ btn: updateBtn, status: true });
      });
    });
  }

  public handlePaginationGarageRequest(updateCurrentPage: UpdateCurrentPage): void {
    prevBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      this.model.currentGaragePage -= 1;
      await updateCurrentPage(ViewType.Garage);
    });

    nextBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      this.model.currentGaragePage += 1;
      await updateCurrentPage(ViewType.Garage);
    });
  }

  public handlePaginationWinnersRequest(updateCurrentPage: UpdateCurrentPage): void {
    prevWinnersBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      this.model.currentWinnersPage -= 1;
      await updateCurrentPage(ViewType.WinnersCurrent);
    });

    nextWinnersBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      this.model.currentWinnersPage += 1;
      await updateCurrentPage(ViewType.WinnersCurrent);
    });
  }

  public async updateGarageSwitchButtons(
    garagePageSwitchView: GaragePageSwitchView
  ): Promise<void> {
    const currentGaragePage = this.model.currentGaragePage;
    let prevBtnState: boolean;
    let nextBtnState: boolean;

    if (currentGaragePage === 1) {
      prevBtnState = false;
    } else {
      const garagePageInfo: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.ReadPage, {
        page: currentGaragePage - 1
      });
      if (!garagePageInfo || !('cars' in garagePageInfo))
        throw new Error('garagePageInfo is undefined at init or wrong type');

      if (garagePageInfo.cars.length) {
        prevBtnState = true;
      } else prevBtnState = false;
    }

    const garagePageInfo: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.ReadPage, {
      page: currentGaragePage + 1
    });
    if (!garagePageInfo || !('cars' in garagePageInfo))
      throw new Error('garagePageInfo is undefined at init or wrong type');

    if (garagePageInfo.cars.length) {
      nextBtnState = true;
    } else nextBtnState = false;

    garagePageSwitchView.updateButtonsState(prevBtnState, nextBtnState);
  }

  public async updateWinnersSwitchButtons(
    winnersPageSwitchView: WinnersPageSwitchView
  ): Promise<void> {
    const currentWinnersPage = this.model.currentWinnersPage;
    let prevBtnState: boolean;
    let nextBtnState: boolean;

    if (currentWinnersPage === 1) {
      prevBtnState = false;
    } else {
      const winnersPageInfo: CRUDWinnersResult = await this.model.CRUDCarsWinners(CRUD.ReadPage, {
        page: currentWinnersPage - 1,
        limit: 10,
        sort: SortType.Wins, // it can be anything
        order: 'DESC' // it can be anything
      });
      if (!winnersPageInfo || !('winners' in winnersPageInfo))
        throw new Error('winnersPageInfo is undefined at init or wrong type');

      if (winnersPageInfo.winners.length) {
        prevBtnState = true;
      } else prevBtnState = false;
    }

    const winnersPageInfo: CRUDWinnersResult = await this.model.CRUDCarsWinners(CRUD.ReadPage, {
      page: currentWinnersPage + 1,
      limit: 10,
      sort: SortType.Wins, // it can be anything
      order: 'DESC' // it can be anything
    });
    if (!winnersPageInfo || !('winners' in winnersPageInfo))
      throw new Error('winnersPageInfo is undefined at init or wrong type');

    if (winnersPageInfo.winners.length) {
      nextBtnState = true;
    } else nextBtnState = false;

    winnersPageSwitchView.updateButtonsState(prevBtnState, nextBtnState);
  }
}

export function switchView(): void {
  selectGarageBtn.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();
    switchPageView(ViewType.Garage);
  });

  selectWinnersBtn.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();
    switchPageView(ViewType.Winners);
  });
}
