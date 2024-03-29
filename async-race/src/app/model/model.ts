import {
  AbortCarData,
  CRUD,
  CRUDOptions,
  CRUDResult,
  Car,
  EngineStatus,
  InputsCarData,
  PageInfo,
  UpdateCarResponse
} from '../../interfaces';
import { regulateEngine } from '../services/engine_api_service';
import { GarageApiService } from '../services/garage_api_service';

export class Model {
  public currentPage: number;

  private garageApiService: GarageApiService;

  constructor() {
    this.currentPage = 1;
    this.garageApiService = new GarageApiService();
  }

  private async getCarsOnPage(page: number): Promise<PageInfo | undefined> {
    const result: PageInfo | undefined = await this.garageApiService.getCars(page);
    if (result) {
      return result;
    }
    throw new Error('PageInfo is undefined at getCarsOnPage');
  }

  private async getCreatedCar(options: InputsCarData): Promise<Car> {
    const createdCar: Car | undefined = await this.garageApiService.createCar(options);
    if (createdCar) return createdCar;
    throw new Error('createdCar is undefined');
  }

  private async getUpdatedCar(options: CRUDOptions): Promise<Car> {
    if (options.id && options.color && options.name !== undefined) {
      const updatedCar: Car | undefined = await this.garageApiService.updateCar(options.id, {
        name: options.name,
        color: options.color
      });
      if (updatedCar) return updatedCar;
    }
    throw new Error('updatedCar or options is undefined');
  }

  public async CRUDCars(action: CRUD, options: CRUDOptions): Promise<CRUDResult> {
    switch (action) {
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
    throw new Error('CRUD option is invalid');
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
