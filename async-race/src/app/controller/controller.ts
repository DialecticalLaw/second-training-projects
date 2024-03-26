import { CRUD, CRUDResult, InputsCarData, HandleAction } from '../../interfaces';
import { Model } from '../model/model';
import { getCreateData, getUpdateData } from '../services/get_form_data_service';
import { drawMainMarkup } from '../view/app_view';
import {
  prevBtn,
  nextBtn
} from '../view/components/garage/garage_switch_block/garage_switch_block';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GarageOptionsView } from '../view/garage_view/garage_options_view';
import { GaragePageSwitchView } from '../view/garage_view/garage_switch_page_view';
import { drawGarage } from '../view/garage_view/garage_view';
import { handleActionRequest } from '../view/handleRequestEvent';

function dispatchInitEvents(): void {
  handleActionRequest(HandleAction.Create);
  handleActionRequest(HandleAction.Update);
  handleActionRequest(HandleAction.Select);
  handleActionRequest(HandleAction.Delete);
  handleActionRequest(HandleAction.Pagination);
}

export class Controller {
  private model: Model;

  private garageInfoView: GarageInfoView;

  private garageOptionsView: GarageOptionsView;

  private garagePageSwitchView: GaragePageSwitchView;

  constructor() {
    this.model = new Model();
    this.garageInfoView = new GarageInfoView();
    this.garageOptionsView = new GarageOptionsView();
    this.garagePageSwitchView = new GaragePageSwitchView();
  }

  public async init(): Promise<void> {
    const pageInfo: CRUDResult = await Model.CRUDCars(CRUD.ReadPage, {
      page: this.model.currentPage
    });
    if (!pageInfo || !('cars' in pageInfo))
      throw new Error('pageInfo is undefined at init or wrong type');

    this.handleActionRequests();
    drawMainMarkup();
    drawGarage();
    this.garageInfoView.drawCars(pageInfo);
    this.garageInfoView.updateGarageInfo(pageInfo.total, pageInfo.page);
    await this.updateSwitchButtonsState();
    dispatchInitEvents();
  }

  private handleActionRequests(): void {
    document.addEventListener(HandleAction.Create, this.handleCreateRequest.bind(this));
    document.addEventListener(HandleAction.Update, this.handleUpdateRequest.bind(this));
    document.addEventListener(HandleAction.Select, this.handleSelectRequest.bind(this));
    document.addEventListener(HandleAction.Delete, this.handleDeleteRequest.bind(this));
    document.addEventListener(HandleAction.Pagination, this.handlePaginationRequest.bind(this));
  }

  private handleCreateRequest(): void {
    const createBtn: HTMLButtonElement | null = document.querySelector('.garage__btn_create');
    if (createBtn) {
      createBtn.addEventListener('click', async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        const data: InputsCarData = getCreateData();
        const createdCar: CRUDResult = await Model.CRUDCars(CRUD.Create, data);

        if (!createdCar) throw new Error('createdCar is undefined at handleCreateRequest');
        await this.updateCurrentPage();
      });
    }
  }

  private async updateCurrentPage(): Promise<void> {
    const pageInfo: CRUDResult = await Model.CRUDCars(CRUD.ReadPage, {
      page: this.model.currentPage
    });
    if (!pageInfo || !('cars' in pageInfo))
      throw new Error('pageInfo is undefined at init or wrong type');
    this.garageInfoView.updatePage(pageInfo);
    this.garageOptionsView.toggleUpdateBtnValidity(false);
    await this.updateSwitchButtonsState();
  }

  private handleSelectRequest(): void {
    const allSelectButtons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll('.garage__car_select')
    );

    allSelectButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        GarageInfoView.selectCar(event);
        this.garageOptionsView.toggleUpdateBtnValidity(true);
      });
    });
  }

  private handleUpdateRequest(): void {
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
        await this.updateCurrentPage();
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
          await Model.CRUDCars(CRUD.Delete, { id });
          await this.updateCurrentPage();
        }
      });
    });
  }

  private async updateSwitchButtonsState(): Promise<void> {
    const currentPage = this.model.currentPage;
    let prevBtnState: boolean;
    let nextBtnState: boolean;

    if (currentPage === 1) {
      prevBtnState = false;
    } else {
      const pageInfo: CRUDResult = await Model.CRUDCars(CRUD.ReadPage, {
        page: this.model.currentPage - 1
      });
      if (!pageInfo || !('cars' in pageInfo))
        throw new Error('pageInfo is undefined at init or wrong type');

      if (pageInfo.cars.length) {
        prevBtnState = true;
      } else prevBtnState = false;
    }

    const pageInfo: CRUDResult = await Model.CRUDCars(CRUD.ReadPage, {
      page: this.model.currentPage + 1
    });
    if (!pageInfo || !('cars' in pageInfo))
      throw new Error('pageInfo is undefined at init or wrong type');

    if (pageInfo.cars.length) {
      nextBtnState = true;
    } else nextBtnState = false;

    this.garagePageSwitchView.updateButtonsState(prevBtnState, nextBtnState);
  }

  private handlePaginationRequest(): void {
    prevBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      this.model.currentPage -= 1;
      await this.updateCurrentPage();
    });

    nextBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      this.model.currentPage += 1;
      await this.updateCurrentPage();
    });
  }
}
