import { CRUD, CRUDOptions, CRUDResult, Car, InputsCarData, PageInfo } from '../../interfaces';
import { createCar, getCars, updateCar } from '../services/garage_api_service';

export class Model {
  private totalCars?: number;

  public readonly currentPage: number;

  constructor() {
    this.currentPage = 1;
  }

  private async getCarsOnPage(page: number): Promise<PageInfo | undefined> {
    const result: PageInfo | undefined = await getCars(page);
    if (result) {
      this.totalCars = result.total;
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
    if (options.id && options.color && options.name) {
      const updatedCar: Car | undefined = await updateCar(options.id, {
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
        if (options.page) {
          return this.getCarsOnPage(options.page);
        }
        break;
      case CRUD.Create:
        return Model.getCreatedCar(options);
      case CRUD.Update:
        return Model.getUpdatedCar(options);
      default:
        break;
    }
    throw new Error('CRUD option is invalid');
  }
}
