import {
  AbortCarData,
  CRUD,
  CRUDGarageOptions,
  CRUDGarageResult,
  CRUDWinnersOptions,
  CRUDWinnersResult,
  Car,
  EngineStatus,
  InputsCarData,
  GaragePageInfo,
  UpdateCarResponse
} from '../../interfaces';
import { regulateEngine } from '../services/engine_api_service';
import { GarageApiService } from '../services/garage_api_service';
import { WinnersApiService } from '../services/winners_api_service';

export class Model {
  public currentGaragePage: number;

  public currentWinnersPage: number;

  private garageApiService: GarageApiService;

  private winnersApiService: WinnersApiService;

  constructor() {
    this.currentGaragePage = 1;
    this.currentWinnersPage = 1;
    this.garageApiService = new GarageApiService();
    this.winnersApiService = new WinnersApiService();
  }

  private async getCarsOnPage(page: number): Promise<GaragePageInfo | undefined> {
    const result: GaragePageInfo | undefined = await this.garageApiService.getCars(page);
    if (result) {
      return result;
    }
    throw new Error('GaragePageInfo is undefined at getCarsOnPage');
  }

  private async getCreatedCar(options: InputsCarData): Promise<Car> {
    const createdCar: Car | undefined = await this.garageApiService.createCar(options);
    if (createdCar) return createdCar;
    throw new Error('createdCar is undefined');
  }

  private async getUpdatedCar(options: CRUDGarageOptions): Promise<Car> {
    if (options.id && options.color && options.name !== undefined) {
      const updatedCar: Car | undefined = await this.garageApiService.updateCar(options.id, {
        name: options.name,
        color: options.color
      });
      if (updatedCar) return updatedCar;
    }
    throw new Error('updatedCar or options is undefined');
  }

  public async CRUDCarsGarage(action: CRUD, options: CRUDGarageOptions): Promise<CRUDGarageResult> {
    switch (action) {
      case CRUD.Read:
        if (options.id) return this.garageApiService.getCar(options.id);
        break;
      case CRUD.ReadPage:
        if (options.page !== undefined) {
          return this.getCarsOnPage(options.page);
        }
        break;
      case CRUD.Create:
        return this.getCreatedCar(options);
      case CRUD.Update:
        return this.getUpdatedCar(options);
      case CRUD.Delete:
        if (options.id) return this.garageApiService.deleteCar(options.id);
        break;
      default:
        break;
    }
    throw new Error('CRUD action is invalid');
  }

  public async CRUDCarsWinners(
    action: CRUD,
    options: CRUDWinnersOptions
  ): Promise<CRUDWinnersResult> {
    switch (action) {
      case CRUD.ReadPage:
        return this.winnersApiService.getWinners(options);
      case CRUD.Read:
        if (options.id) return this.winnersApiService.getWinner(options.id);
        break;
      case CRUD.Create:
        await this.winnersApiService.createWinner(options);
        break;
      case CRUD.Update:
        await this.winnersApiService.updateWinner(options);
        break;
      case CRUD.Delete:
        if (options.id) await this.winnersApiService.deleteWinner(options.id);
        break;
      default:
        break;
    }
    return undefined;
  }

  public static async updateCarStatus(
    id: string,
    status: EngineStatus,
    abortData?: AbortCarData
  ): Promise<UpdateCarResponse> {
    const response: UpdateCarResponse = await regulateEngine(id, status, abortData);
    return response;
  }
}
