import {
  CRUD,
  CRUDGarageResult,
  InputsCarData,
  UpdateCurrentPage,
  ViewType
} from '../../interfaces';
import { Model } from '../model/model';
import { getCreateData, getUpdateData } from '../services/get_form_data_service';
import { toggleLoadingProcess } from '../view/app_view';
import { generateBtn } from '../view/components/garage/garage_options/garage_options';
import { updateButtonState } from '../view/garage_view/garage_view';

export class GarageCRUDController {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public handleCreateRequest(updateCurrentPage: UpdateCurrentPage): void {
    const createBtn: HTMLButtonElement | null = document.querySelector('.garage__btn_create');
    if (createBtn) {
      createBtn.addEventListener('click', async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        const data: InputsCarData = getCreateData();
        const createdCar: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.Create, data);

        if (!createdCar) throw new Error('createdCar is undefined at handleCreateRequest');
        await updateCurrentPage(ViewType.Garage);
      });
    }
  }

  public handleUpdateRequest(updateCurrentPage: UpdateCurrentPage): void {
    const updateBtn: HTMLButtonElement | null = document.querySelector('.garage__btn_update');
    if (updateBtn) {
      updateBtn.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();
        const data: InputsCarData = getUpdateData();
        const selectedCar: HTMLDivElement | null = document.querySelector('.selected');

        if (!selectedCar) throw new Error('selectedCar is undefined');
        const id: string = selectedCar.id;
        const updatedCar: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.Update, {
          ...data,
          id
        });

        if (!updatedCar) throw new Error('updatedCar is undefined at handleCreateRequest');
        await updateCurrentPage(ViewType.Garage);
      });
    }
  }

  public handleDeleteRequest(updateCurrentPage: UpdateCurrentPage): void {
    const allRemoveButtons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll('.garage__car_remove')
    );
    allRemoveButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();
        const eventTarget: EventTarget | null = event.target;

        if (eventTarget instanceof HTMLButtonElement) {
          updateButtonState({ btn: eventTarget, status: false });
          const carCard: HTMLElement | null | undefined = eventTarget.parentElement?.parentElement;
          if (!carCard || !(carCard instanceof HTMLDivElement))
            throw new Error('carCard is undefined or wrong');

          const id = carCard.id;
          await this.model.CRUDCarsGarage(CRUD.Delete, { id });
          await this.model.CRUDCarsWinners(CRUD.Delete, { id });
          await updateCurrentPage(ViewType.WinnersCurrent);
          await updateCurrentPage(ViewType.Garage);
        }
      });
    });
  }

  public handleGenerateRequest(updateCurrentPage: UpdateCurrentPage): void {
    generateBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      toggleLoadingProcess(true);
      const promises: Promise<CRUDGarageResult>[] = [];

      for (let i = 0; i < 100; i += 1) {
        const data: InputsCarData = getCreateData(true);
        promises.push(this.model.CRUDCarsGarage(CRUD.Create, data));
      }

      await Promise.all(promises);
      await updateCurrentPage(ViewType.Garage);
      toggleLoadingProcess(false);
    });
  }
}
