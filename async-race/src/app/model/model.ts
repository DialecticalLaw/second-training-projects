import {
  CRUD,
  CRUDOptions,
  CRUDResult,
  Car,
  CarProps,
  EngineStatus,
  InputsCarData,
  PageInfo,
  SuccessResponse
} from '../../interfaces';
import { regulateEngine } from '../services/engine_api_service';
import { createCar, deleteCar, getCars, updateCar } from '../services/garage_api_service';

export class Model {
  public currentPage: number;

  constructor() {
    this.currentPage = 1;
  }

  private static async getCarsOnPage(page: number): Promise<PageInfo | undefined> {
    const result: PageInfo | undefined = await getCars(page);
    if (result) {
      return result;
    }
    throw new Error('PageInfo is undefined at getCarsOnPage');
  }

  private static async getCreatedCar(options: InputsCarData): Promise<Car> {
    const createdCar: Car | undefined = await createCar(options);
    if (createdCar) return createdCar;
    throw new Error('createdCar is undefined');
  }

  private static async getUpdatedCar(options: CRUDOptions): Promise<Car> {
    if (options.id && options.color && options.name !== undefined) {
      const updatedCar: Car | undefined = await updateCar(options.id, {
        name: options.name,
        color: options.color
      });
      if (updatedCar) return updatedCar;
    }
    throw new Error('updatedCar or options is undefined');
  }

  public static async CRUDCars(action: CRUD, options: CRUDOptions): Promise<CRUDResult> {
    switch (action) {
      case CRUD.ReadPage:
        if (options.page !== undefined) {
          return Model.getCarsOnPage(options.page);
        }
        break;
      case CRUD.Create:
        return Model.getCreatedCar(options);
      case CRUD.Update:
        return Model.getUpdatedCar(options);
      case CRUD.Delete:
        if (options.id) return deleteCar(options.id);
        break;
      default:
        break;
    }
    throw new Error('CRUD option is invalid');
  }

  public static async updateCarStatus(
    id: string,
    status: EngineStatus
  ): Promise<CarProps | SuccessResponse | undefined> {
    const response: CarProps | SuccessResponse | undefined = await regulateEngine(id, status);
    return response;
  }
}
