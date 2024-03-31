import { CRUD, CRUDResult, HandleAction, UpdateBtnValidityClass, ViewType } from '../../interfaces';
import { Model } from '../model/model';
import { drawMainMarkup } from '../view/app_view';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GarageOptionsView } from '../view/garage_view/garage_options_view';
import { GaragePageSwitchView } from '../view/garage_view/garage_switch_page_view';
import { drawGarage } from '../view/garage_view/garage_view';
import { handleActionRequest } from '../view/handleRequestEvent';
import { WinnersTableView } from '../view/winners_view/winners_table_view';
import { drawWinners } from '../view/winners_view/winners_view';
import { EventCRUDExecutor } from './event_CRUD_executor';
import { EventActionExecutor, switchView } from './event_action_executor';

function dispatchInitEvents(): void {
  handleActionRequest(HandleAction.Create);
  handleActionRequest(HandleAction.Update);
  handleActionRequest(HandleAction.Select);
  handleActionRequest(HandleAction.Delete);
  handleActionRequest(HandleAction.PaginationGarage);
  handleActionRequest(HandleAction.PaginationWinners);
  handleActionRequest(HandleAction.Generate);
  handleActionRequest(HandleAction.Gas);
  handleActionRequest(HandleAction.Brake);
  handleActionRequest(HandleAction.Race);
  handleActionRequest(HandleAction.Reset);
  handleActionRequest(HandleAction.SwitchPage);
}

export class Controller {
  protected model: Model;

  private eventActionExecutor: EventActionExecutor;

  private eventCRUDExecutor: EventCRUDExecutor;

  private garageInfoView: GarageInfoView;

  private garagePageSwitchView: GaragePageSwitchView;

  private winnersTableView: WinnersTableView;

  constructor() {
    this.model = new Model();
    this.garageInfoView = new GarageInfoView();
    this.garagePageSwitchView = new GaragePageSwitchView();
    this.eventActionExecutor = new EventActionExecutor(this.model);
    this.eventCRUDExecutor = new EventCRUDExecutor(this.model);
    this.winnersTableView = new WinnersTableView();
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
    drawWinners();
    this.garageInfoView.drawCars(pageInfo);
    this.garageInfoView.updateGarageInfo(pageInfo.total, pageInfo.page);
    await this.updateSwitchButtonsState();
    dispatchInitEvents();
  }

  private handleActionRequests(): void {
    document.addEventListener(HandleAction.Select, () => {
      EventActionExecutor.handleSelectRequest();
    });
    document.addEventListener(
      HandleAction.PaginationGarage,
      this.eventActionExecutor.handlePaginationGarageRequest.bind(
        this.eventActionExecutor,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(
      HandleAction.PaginationWinners,
      this.eventActionExecutor.handlePaginationWinnersRequest.bind(
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
    document.addEventListener(
      HandleAction.Race,
      this.eventActionExecutor.handleRaceRequest.bind(this.eventActionExecutor, this.garageInfoView)
    );
    document.addEventListener(
      HandleAction.Reset,
      this.eventActionExecutor.handleResetRequest.bind(
        this.eventActionExecutor,
        this.garageInfoView
      )
    );
    document.addEventListener(HandleAction.SwitchPage, switchView);
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

  private async updateCurrentPage(viewType: ViewType): Promise<void> {
    if (viewType === ViewType.Garage) {
      const pageInfo: CRUDResult = await this.model.CRUDCars(CRUD.ReadPage, {
        page: this.model.currentPage
      });
      if (!pageInfo || !('cars' in pageInfo))
        throw new Error('pageInfo is undefined at init or wrong type');
      this.garageInfoView.updatePage(pageInfo);
      GarageOptionsView.toggleUpdateBtnValidity(false, UpdateBtnValidityClass.Disabled);
      await this.updateSwitchButtonsState();
    } else {
    }
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
