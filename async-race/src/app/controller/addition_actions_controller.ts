import { UpdateBtnValidityClass, UpdateCurrentPage, ViewType } from '../../interfaces';
import { Model } from '../model/model';
import { switchPageView } from '../view/app_view';
import {
  nextBtn,
  prevBtn
} from '../view/components/garage/garage_switch_block/garage_switch_block';
import { selectGarageBtn, selectWinnersBtn } from '../view/components/header/header';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GarageOptionsView } from '../view/garage_view/garage_options_view';

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
        GarageOptionsView.toggleUpdateBtnValidity(true, UpdateBtnValidityClass.Disabled);
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
