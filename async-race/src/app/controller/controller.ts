import {
  CRUD,
  CRUDResult,
  InputsCarData,
  HandleAction,
  OptionsTypes,
  SwitchDisplayAction
} from '../../interfaces';
import { Model } from '../model/model';
import { getCreateData, getUpdateData } from '../services/get_form_data_service';
import { AppView } from '../view/app_view';
import { isValid } from './validity';

export class Controller {
  private model: Model;

  private appView: AppView;

  constructor() {
    this.model = new Model();
    this.appView = new AppView();
  }

  public async init(): Promise<void> {
    const pageInfo: CRUDResult = await this.model.CRUDCars(CRUD.ReadPage, {
      page: 1
    });
    if (!pageInfo || !('cars' in pageInfo))
      throw new Error('pageInfo is undefined at init or wrong type');
    this.appView.start(pageInfo);
  }

  public handleActionRequest(action: HandleAction): void {
    switch (action) {
      case HandleAction.Create:
        this.handleCreateRequest();
        break;
      case HandleAction.Select:
        this.handleSelectRequest();
        break;
      case HandleAction.Update:
        this.handleUpdateRequest();
        break;
      case HandleAction.Delete:
        this.handleDeleteRequest();
        break;
      default:
        break;
    }
  }

  private handleCreateRequest(): void {
    const createBtn: HTMLButtonElement | null = document.querySelector('.garage__btn_create');
    if (createBtn) {
      createBtn.addEventListener('click', async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        if (isValid(OptionsTypes.Create)) {
          const data: InputsCarData = getCreateData();
          const createdCar: CRUDResult = await this.model.CRUDCars(CRUD.Create, data);

          if (!createdCar) throw new Error('createdCar is undefined at handleCreateRequest');
          await this.updateCurrentPage();
        }
      });
    }
  }

  private async updateCurrentPage(): Promise<void> {
    const pageInfo: CRUDResult = await this.model.CRUDCars(CRUD.ReadPage, {
      page: this.model.currentPage
    });
    if (!pageInfo || !('cars' in pageInfo))
      throw new Error('pageInfo is undefined at init or wrong type');
    this.appView.switchComponentDisplay(SwitchDisplayAction.UpdatePage, { pageInfo });
  }

  private handleSelectRequest(): void {
    const allSelectButtons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll('.garage__car_select')
    );

    allSelectButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        this.appView.switchComponentDisplay(SwitchDisplayAction.SelectCar, { event });
      });
    });
  }

  private handleUpdateRequest(): void {
    const updateBtn: HTMLButtonElement | null = document.querySelector('.garage__btn_update');
    if (updateBtn) {
      updateBtn.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();
        if (isValid(OptionsTypes.Update)) {
          const data: InputsCarData = getUpdateData();
          const selectedCar: HTMLDivElement | null = document.querySelector('.selected');
          if (!selectedCar) throw new Error('selectedCar is undefined');
          const id: string = selectedCar.id;
          const updatedCar: CRUDResult = await this.model.CRUDCars(CRUD.Update, { ...data, id });

          if (!updatedCar) throw new Error('updatedCar is undefined at handleCreateRequest');
          await this.updateCurrentPage();
        }
      });
    }
  }

  private handleDeleteRequest(): void {
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
          this.model.CRUDCars(CRUD.Delete, { id });
          this.appView.switchComponentDisplay(SwitchDisplayAction.RemoveCar, { carCard });
        }
      });
    });
  }
}
