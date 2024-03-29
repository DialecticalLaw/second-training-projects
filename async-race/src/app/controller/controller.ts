import { CRUD, CRUDResult, HandleAction } from '../../interfaces';
import { Model } from '../model/model';
import { drawMainMarkup } from '../view/app_view';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GarageOptionsView } from '../view/garage_view/garage_options_view';
import { GaragePageSwitchView } from '../view/garage_view/garage_switch_page_view';
import { drawGarage } from '../view/garage_view/garage_view';
import { handleActionRequest } from '../view/handleRequestEvent';
import { EventCRUDExecutor } from './event_CRUD_executor';
import { EventActionExecutor } from './event_action_executor';

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

  private eventActionExecutor: EventActionExecutor;

  private eventCRUDExecutor: EventCRUDExecutor;

  private garageInfoView: GarageInfoView;

  private garageOptionsView: GarageOptionsView;

  private garagePageSwitchView: GaragePageSwitchView;

  constructor() {
    this.model = new Model();
    this.garageInfoView = new GarageInfoView();
    this.garageOptionsView = new GarageOptionsView();
    this.garagePageSwitchView = new GaragePageSwitchView();
    this.eventActionExecutor = new EventActionExecutor(this.model);
    this.eventCRUDExecutor = new EventCRUDExecutor(this.model);
  }

  public async init(): Promise<void> {
    const pageInfo: CRUDResult = await this.model.CRUDCars(CRUD.ReadPage, {
      page: this.model.currentPage
    });
    if (!pageInfo || !('cars' in pageInfo))
      throw new Error('pageInfo is undefined at init or wrong type');

    this.handleActionRequests();
    this.handleCRUDRequests();
    drawMainMarkup();
    drawGarage();
    this.garageInfoView.drawCars(pageInfo);
    this.garageInfoView.updateGarageInfo(pageInfo.total, pageInfo.page);
    await this.updateSwitchButtonsState();
    dispatchInitEvents();
  }

  private handleActionRequests(): void {
    document.addEventListener(HandleAction.Select, () => {
      EventActionExecutor.handleSelectRequest(this.garageOptionsView);
    });
    document.addEventListener(
      HandleAction.Pagination,
      this.eventActionExecutor.handlePaginationRequest.bind(
        this.eventActionExecutor,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(HandleAction.Gas, () => {
      this.eventActionExecutor.handleGasRequest.bind(this.eventActionExecutor)();
    });
    document.addEventListener(HandleAction.Brake, () => {
      this.eventActionExecutor.handleBrakeRequest.bind(this.eventActionExecutor)();
    });
  }

  private handleCRUDRequests(): void {
    document.addEventListener(
      HandleAction.Create,
      this.eventCRUDExecutor.handleCreateRequest.bind(
        this.eventCRUDExecutor,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(
      HandleAction.Update,
      this.eventCRUDExecutor.handleUpdateRequest.bind(
        this.eventCRUDExecutor,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(
      HandleAction.Delete,
      this.eventCRUDExecutor.handleDeleteRequest.bind(
        this.eventCRUDExecutor,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(
      HandleAction.Generate,
      this.eventCRUDExecutor.handleGenerateRequest.bind(
        this.eventCRUDExecutor,
        this.updateCurrentPage.bind(this)
      )
    );
  }

  private async updateCurrentPage(): Promise<void> {
    const pageInfo: CRUDResult = await this.model.CRUDCars(CRUD.ReadPage, {
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
      const pageInfo: CRUDResult = await this.model.CRUDCars(CRUD.ReadPage, {
        page: this.model.currentPage - 1
      });
      if (!pageInfo || !('cars' in pageInfo))
        throw new Error('pageInfo is undefined at init or wrong type');

      if (pageInfo.cars.length) {
        prevBtnState = true;
      } else prevBtnState = false;
    }

    const pageInfo: CRUDResult = await this.model.CRUDCars(CRUD.ReadPage, {
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
