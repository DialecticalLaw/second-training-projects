import {
  CRUD,
  CRUDResult,
  DataForCreate,
  HandleAction,
  OptionsTypes,
  SwitchDisplayAction
} from '../../interfaces';
import { Model } from '../model/model';
import { getCreateData } from '../services/get_form_data_service';
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
        // this.handleUpdateRequest();
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
          const data: DataForCreate = getCreateData();
          const createdCar: CRUDResult = await this.model.CRUDCars(CRUD.Create, data);

          if (!createdCar || !('color' in createdCar))
            throw new Error('createdCar is undefined at handleCreateRequest or wrong type');

          const pageInfo: CRUDResult = await this.model.CRUDCars(CRUD.ReadPage, {
            page: this.model.currentPage
          });
          if (!pageInfo || !('cars' in pageInfo))
            throw new Error('pageInfo is undefined at init or wrong type');
          this.appView.switchComponentDispay(SwitchDisplayAction.UpdatePage, { pageInfo });
        }
      });
    }
  }

  private handleSelectRequest(): void {
    const allSelectButtons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll('.garage__car_select')
    );

    allSelectButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        this.appView.switchComponentDispay(SwitchDisplayAction.SelectCar, { event });
      });
    });
  }

  // private handleUpdateRequest(): void {}
}
