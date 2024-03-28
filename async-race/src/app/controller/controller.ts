import { CRUD, CRUDResult, HandleAction } from '../../interfaces';
import { Model } from '../model/model';
import { drawMainMarkup } from '../view/app_view';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GarageOptionsView } from '../view/garage_view/garage_options_view';
import { GaragePageSwitchView } from '../view/garage_view/garage_switch_page_view';
import { drawGarage } from '../view/garage_view/garage_view';
import { handleActionRequest } from '../view/handleRequestEvent';
import { EventExecutor } from './event_executor';

function dispatchInitEvents(): void {
  handleActionRequest(HandleAction.Create);
  handleActionRequest(HandleAction.Update);
  handleActionRequest(HandleAction.Select);
  handleActionRequest(HandleAction.Delete);
  handleActionRequest(HandleAction.Pagination);
  handleActionRequest(HandleAction.Generate);
  handleActionRequest(HandleAction.Gas);
  handleActionRequest(HandleAction.Brake);
}

export class Controller {
  protected model: Model;

  private eventExecutor: EventExecutor;

  private garageInfoView: GarageInfoView;

  private garageOptionsView: GarageOptionsView;

  private garagePageSwitchView: GaragePageSwitchView;

  constructor() {
    this.model = new Model();
    this.garageInfoView = new GarageInfoView();
    this.garageOptionsView = new GarageOptionsView();
    this.garagePageSwitchView = new GaragePageSwitchView();
    this.eventExecutor = new EventExecutor(this.model);
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
    document.addEventListener(HandleAction.Create, () => {
      EventExecutor.handleCreateRequest(this.updateCurrentPage.bind(this));
    });
    document.addEventListener(HandleAction.Select, () => {
      EventExecutor.handleSelectRequest(this.garageOptionsView);
    });
    document.addEventListener(HandleAction.Update, () => {
      EventExecutor.handleUpdateRequest(this.updateCurrentPage.bind(this));
    });
    document.addEventListener(HandleAction.Delete, () => {
      EventExecutor.handleDeleteRequest(this.updateCurrentPage.bind(this));
    });
    document.addEventListener(
      HandleAction.Pagination,
      this.eventExecutor.handlePaginationRequest.bind(
        this.eventExecutor,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(HandleAction.Generate, () => {
      EventExecutor.handleGenerateRequest(this.updateCurrentPage.bind(this));
    });
    document.addEventListener(HandleAction.Gas, () => {
      this.eventExecutor.handleGasRequest.bind(this.eventExecutor)();
    });
    document.addEventListener(HandleAction.Brake, () => {
      this.eventExecutor.handleBrakeRequest.bind(this.eventExecutor)();
    });
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
}
