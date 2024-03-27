import { CRUD, CRUDResult, InputsCarData, UpdateCurrentPage } from '../../interfaces';
import { Model } from '../model/model';
import { getCreateData, getUpdateData } from '../services/get_form_data_service';
import { toggleLoadingProcess } from '../view/app_view';
import { generateBtn } from '../view/components/garage/garage_options/garage_options';
import {
  nextBtn,
  prevBtn
} from '../view/components/garage/garage_switch_block/garage_switch_block';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GarageOptionsView } from '../view/garage_view/garage_options_view';

export class EventExecutor {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public static handleCreateRequest(updateCurrentPage: UpdateCurrentPage): void {
    const createBtn: HTMLButtonElement | null = document.querySelector('.garage__btn_create');
    if (createBtn) {
      createBtn.addEventListener('click', async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        const data: InputsCarData = getCreateData();
        const createdCar: CRUDResult = await Model.CRUDCars(CRUD.Create, data);

        if (!createdCar) throw new Error('createdCar is undefined at handleCreateRequest');
        await updateCurrentPage();
      });
    }
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

  public static handleUpdateRequest(updateCurrentPage: UpdateCurrentPage): void {
    const updateBtn: HTMLButtonElement | null = document.querySelector('.garage__btn_update');
    if (updateBtn) {
      updateBtn.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();
        const data: InputsCarData = getUpdateData();
        const selectedCar: HTMLDivElement | null = document.querySelector('.selected');

        if (!selectedCar) throw new Error('selectedCar is undefined');
        const id: string = selectedCar.id;
        const updatedCar: CRUDResult = await Model.CRUDCars(CRUD.Update, { ...data, id });

        if (!updatedCar) throw new Error('updatedCar is undefined at handleCreateRequest');
        await updateCurrentPage();
      });
    }
  }

  public static handleDeleteRequest(updateCurrentPage: UpdateCurrentPage): void {
    const allRemoveButtons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll('.garage__car_remove')
    );
    allRemoveButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();
        const eventTarget: EventTarget | null = event.target;

        if (eventTarget instanceof HTMLButtonElement) {
          const carCard: HTMLElement | null | undefined = eventTarget.parentElement?.parentElement;
          if (!carCard || !(carCard instanceof HTMLDivElement))
            throw new Error('carCard is undefined or wrong');

          const id = carCard.id;
          await Model.CRUDCars(CRUD.Delete, { id });
          await updateCurrentPage();
        }
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

  public static handleGenerateRequest(updateCurrentPage: UpdateCurrentPage): void {
    generateBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      toggleLoadingProcess(true);
      const promises: Promise<CRUDResult>[] = [];

      for (let i = 0; i < 100; i += 1) {
        const data: InputsCarData = getCreateData(true);
        promises.push(Model.CRUDCars(CRUD.Create, data));
      }

      await Promise.all(promises);
      await updateCurrentPage();
      toggleLoadingProcess(false);
    });
  }
}
