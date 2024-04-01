import {
  CRUD,
  CRUDGarageResult,
  HandleAction,
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
import { GaragePageSwitchView } from '../view/garage_view/garage_switch_page_view';
import { drawGarage, updateButtonState } from '../view/garage_view/garage_view';
import { handleActionRequest } from '../view/handleRequestEvent';
import { WinnersView, drawWinners } from '../view/winners_view/winners_view';
import { GarageCRUDController } from './garage_CRUD_controller';
import { AdditionController, switchView } from './addition_actions_controller';
import { CarsController } from './cars_controller';
import { updateBtn } from '../view/components/garage/garage_options/garage_options';
import { WinnersPageSwitchView } from '../view/winners_view/winners_switch_page_view';

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

function getCurrentTableOptions(): [SortType, 'ASC' | 'DESC'] {
  return [SortType.Wins, 'DESC'];
}

export class Controller {
  protected model: Model;

  private additionController: AdditionController;

  private garageCRUDController: GarageCRUDController;

  private carsController: CarsController;

  private garageInfoView: GarageInfoView;

  private garagePageSwitchView: GaragePageSwitchView;

  private winnersPageSwitchView: WinnersPageSwitchView;

  private winnersView: WinnersView;

  constructor() {
    this.model = new Model();
    this.garageInfoView = new GarageInfoView();
    this.garagePageSwitchView = new GaragePageSwitchView();
    this.winnersPageSwitchView = new WinnersPageSwitchView();
    this.additionController = new AdditionController(this.model);
    this.garageCRUDController = new GarageCRUDController(this.model);
    this.carsController = new CarsController(this.model);
    this.winnersView = new WinnersView();
  }

  public async init(): Promise<void> {
    const garagePageInfo: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.ReadPage, {
      page: this.model.currentGaragePage
    });
    if (!garagePageInfo || !('cars' in garagePageInfo))
      throw new Error('garagePageInfo is undefined at init or wrong type');

    this.handleAdditionRequests();
    this.handleCarsRequests();
    this.handleGarageCRUDRequests();
    drawMainMarkup();
    drawGarage();
    drawWinners();
    this.updateCurrentPage(ViewType.Garage);
    this.updateCurrentPage(ViewType.Winners, { limit: 10, sort: SortType.Wins, order: 'DESC' });
    await this.additionController.updateGarageSwitchButtons(this.garagePageSwitchView);
    await this.additionController.updateWinnersSwitchButtons(this.winnersPageSwitchView);
    dispatchInitEvents();
  }

  private handleAdditionRequests(): void {
    document.addEventListener(HandleAction.Select, AdditionController.handleSelectRequest);
    document.addEventListener(
      HandleAction.PaginationGarage,
      this.additionController.handlePaginationGarageRequest.bind(
        this.additionController,
        this.updateCurrentPage.bind(this)
      )
    );

    document.addEventListener(
      HandleAction.PaginationWinners,
      this.additionController.handlePaginationWinnersRequest.bind(
        this.additionController,
        this.updateCurrentPage.bind(this)
      )
    );

    document.addEventListener(HandleAction.SwitchPage, switchView);
  }

  private handleCarsRequests(): void {
    document.addEventListener(
      HandleAction.Gas,
      this.carsController.handleGasRequest.bind(this.carsController)
    );
    document.addEventListener(
      HandleAction.Brake,
      this.carsController.handleBrakeRequest.bind(this.carsController)
    );
    document.addEventListener(
      HandleAction.Race,
      this.carsController.handleRaceRequest.bind(
        this.carsController,
        this.garageInfoView,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(
      HandleAction.Reset,
      this.carsController.handleResetRequest.bind(this.carsController, this.garageInfoView)
    );
  }

  private handleGarageCRUDRequests(): void {
    document.addEventListener(
      HandleAction.Create,
      this.garageCRUDController.handleCreateRequest.bind(
        this.garageCRUDController,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(
      HandleAction.Update,
      this.garageCRUDController.handleUpdateRequest.bind(
        this.garageCRUDController,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(
      HandleAction.Delete,
      this.garageCRUDController.handleDeleteRequest.bind(
        this.garageCRUDController,
        this.updateCurrentPage.bind(this)
      )
    );
    document.addEventListener(
      HandleAction.Generate,
      this.garageCRUDController.handleGenerateRequest.bind(
        this.garageCRUDController,
        this.updateCurrentPage.bind(this)
      )
    );
  }

  private async updateCurrentPage(viewType: ViewType, options?: WinnersPageOptions): Promise<void> {
    if (viewType === ViewType.Garage) {
      this.garagePageSwitchView.updateButtonsState(false, false);
      const garagePageInfo: CRUDGarageResult = await this.model.CRUDCarsGarage(CRUD.ReadPage, {
        page: this.model.currentGaragePage
      });
      if (!garagePageInfo || !('cars' in garagePageInfo))
        throw new Error('garagePageInfo is undefined or wrong type');

      this.garageInfoView.updatePage(garagePageInfo);
      updateButtonState({ btn: updateBtn, status: false });
      await this.additionController.updateGarageSwitchButtons(this.garagePageSwitchView);
    } else if (viewType === ViewType.Winners) {
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
    } else {
      const [sort, order] = getCurrentTableOptions();
      this.winnersPageSwitchView.updateButtonsState(false, false);
      const winners: CRUDWinnersResult = await this.model.CRUDCarsWinners(CRUD.ReadPage, {
        page: this.model.currentWinnersPage,
        limit: 10,
        sort,
        order
      });
      if (!winners || !('winners' in winners)) throw new Error('winnersPageInfo is wrong');

      const expandedWinners: Winners = await this.expandWinnerInfo(winners);
      this.winnersView.updatePage(expandedWinners);
      await this.additionController.updateWinnersSwitchButtons(this.winnersPageSwitchView);
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
}
