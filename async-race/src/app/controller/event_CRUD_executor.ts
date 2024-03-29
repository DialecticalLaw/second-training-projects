import { CRUD, CRUDResult, InputsCarData, UpdateCurrentPage } from '../../interfaces';
import { Model } from '../model/model';
import { getCreateData, getUpdateData } from '../services/get_form_data_service';
import { toggleLoadingProcess } from '../view/app_view';
import { generateBtn } from '../view/components/garage/garage_options/garage_options';

export class EventCRUDExecutor {
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
        const createdCar: CRUDResult = await this.model.CRUDCars(CRUD.Create, data);

        if (!createdCar) throw new Error('createdCar is undefined at handleCreateRequest');
        await updateCurrentPage();
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
        const updatedCar: CRUDResult = await this.model.CRUDCars(CRUD.Update, { ...data, id });

        if (!updatedCar) throw new Error('updatedCar is undefined at handleCreateRequest');
        await updateCurrentPage();
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
          const carCard: HTMLElement | null | undefined = eventTarget.parentElement?.parentElement;
          if (!carCard || !(carCard instanceof HTMLDivElement))
            throw new Error('carCard is undefined or wrong');

          const id = carCard.id;
          await this.model.CRUDCars(CRUD.Delete, { id });
          await updateCurrentPage();
        }
      });
    });
  }

  public handleGenerateRequest(updateCurrentPage: UpdateCurrentPage): void {
    generateBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      toggleLoadingProcess(true);
      const promises: Promise<CRUDResult>[] = [];

      for (let i = 0; i < 100; i += 1) {
        const data: InputsCarData = getCreateData(true);
        promises.push(this.model.CRUDCars(CRUD.Create, data));
      }

      await Promise.all(promises);
      await updateCurrentPage();
      toggleLoadingProcess(false);
    });
  }
}
