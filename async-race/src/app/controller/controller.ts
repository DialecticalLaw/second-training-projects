import {
  CRUD,
  CRUDGarageResult,
  HandleAction,
  UpdateBtnValidityClass,
  WinnersPageOptions,
  ViewType,
  CRUDWinnersResult,
  WinnerInfo,
  SortType,
  Winners
} from '../../interfaces';
import { Model } from '../model/model';
import { drawMainMarkup } from '../view/app_view';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GarageOptionsView } from '../view/garage_view/garage_options_view';
import { GaragePageSwitchView } from '../view/garage_view/garage_switch_page_view';
import { drawGarage } from '../view/garage_view/garage_view';
import { handleActionRequest } from '../view/handleRequestEvent';
import { WinnersView, drawWinners } from '../view/winners_view/winners_view';
import { EventCRUDExecutor } from './event_CRUD_executor';
import { EventActionExecutor, switchView } from './event_action_executor';

function dispatchInitEvents(): void {
  handleActionRequest(HandleAction.Create);
  handleActionRequest(HandleAction.Update);
  handleActionRequest(HandleAction.PaginationGarage);
  handleActionRequest(HandleAction.PaginationWinners);
  handleActionRequest(HandleAction.Generate);
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

  private winnersView: WinnersView;

  constructor() {
    this.model = new Model();
    this.garageInfoView = new GarageInfoView();
    this.garagePageSwitchView = new GaragePageSwitchView();
    this.eventActionExecutor = new EventActionExecutor(this.model);
    this.eventCRUDExecutor = new EventCRUDExecutor(this.model);
    this.winnersView = new WinnersView();
  }

  public async init(): Promise<void> {
    const garagePageInfo: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.ReadPage, {
      page: this.model.currentGaragePage
    });
    if (!garagePageInfo || !('cars' in garagePageInfo))
      throw new Error('garagePageInfo is undefined at init or wrong type');

    this.handleActionRequests();
    this.handleCRUDRequests();
    drawMainMarkup();
    drawGarage();
    drawWinners();
    this.updateCurrentPage(ViewType.Garage);
    this.updateCurrentPage(ViewType.Winners, { limit: 10, sort: SortType.Wins, order: 'DESC' });
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
    document.addEventListener(HandleAction.Gas, () => {
      this.eventActionExecutor.handleGasRequest.bind(this.eventActionExecutor)();
    });
    document.addEventListener(HandleAction.Brake, () => {
      this.eventActionExecutor.handleBrakeRequest.bind(this.eventActionExecutor)();
    });
    document.addEventListener(
      HandleAction.Race,
      this.eventActionExecutor.handleRaceRequest.bind(
        this.eventActionExecutor,
        this.garageInfoView,
        this.updateCurrentPage.bind(this)
      )
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

  private async updateCurrentPage(viewType: ViewType, options?: WinnersPageOptions): Promise<void> {
    if (viewType === ViewType.Garage) {
      const garagePageInfo: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.ReadPage, {
        page: this.model.currentGaragePage
      });
      if (!garagePageInfo || !('cars' in garagePageInfo))
        throw new Error('garagePageInfo is undefined or wrong type');

      this.garageInfoView.updatePage(garagePageInfo);
      GarageOptionsView.toggleUpdateBtnValidity(false, UpdateBtnValidityClass.Disabled);
      await this.updateSwitchButtonsState();
    } else {
      if (!options) throw new Error('options is undefined');
      const winners: CRUDWinnersResult = await this.model.CRUDCarsWinners(CRUD.ReadPage, {
        page: this.model.currentWinnersPage,
        limit: options.limit,
        sort: options.sort,
        order: options.order
      });
      if (!winners || !('winners' in winners)) throw new Error('winnersPageInfo is wrong');

      const expandedWinners: Winners = await this.expandWinnerInfo(winners);
      this.winnersView.updatePage(expandedWinners);
    }
  }

  private async expandWinnerInfo(winners: Winners): Promise<Winners> {
    const promises: Promise<CRUDGarageResult>[] = [];
    const winnersCopy: Winners = { ...winners };

    winnersCopy.winners.forEach((winner: WinnerInfo): void => {
      if (!winner.id) throw new Error('id is undefined');
      const car: Promise<CRUDGarageResult> = this.model.CRUDCarsGarage(CRUD.Read, {
        id: winner.id
      });
      promises.push(car);
    });
    const resolvedPromises: CRUDGarageResult[] = await Promise.all(promises);
    winnersCopy.winners.forEach((winner: WinnerInfo): void => {
      const car: CRUDGarageResult = resolvedPromises.find(
        (promiseResult: CRUDGarageResult): boolean => {
          if (!promiseResult || !('color' in promiseResult)) throw new Error('car is wrong');
          if (Number(promiseResult.id) === Number(winner.id)) return true;
          return false;
        }
      );
      if (!car || !('color' in car)) throw new Error('car is wrong');
      const winnerLink = winner;
      winnerLink.color = car.color;
      winnerLink.name = car.name;
    });
    return winnersCopy;
  }

  private async updateSwitchButtonsState(): Promise<void> {
    const currentGaragePage = this.model.currentGaragePage;
    let prevBtnState: boolean;
    let nextBtnState: boolean;

    if (currentGaragePage === 1) {
      prevBtnState = false;
    } else {
      const garagePageInfo: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.ReadPage, {
        page: this.model.currentGaragePage - 1
      });
      if (!garagePageInfo || !('cars' in garagePageInfo))
        throw new Error('garagePageInfo is undefined at init or wrong type');

      if (garagePageInfo.cars.length) {
        prevBtnState = true;
      } else prevBtnState = false;
    }

    const garagePageInfo: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.ReadPage, {
      page: this.model.currentGaragePage + 1
    });
    if (!garagePageInfo || !('cars' in garagePageInfo))
      throw new Error('garagePageInfo is undefined at init or wrong type');

    if (garagePageInfo.cars.length) {
      nextBtnState = true;
    } else nextBtnState = false;

    this.garagePageSwitchView.updateButtonsState(prevBtnState, nextBtnState);
  }
}
