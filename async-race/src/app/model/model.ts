import { CRUD, CRUDOptions, CRUDResult, Car, DataForCreate, PageInfo } from '../../interfaces';
import { createCar, getCars } from '../services/garage_api_service';

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

  private async getCreatedCar(options: DataForCreate): Promise<Car> {
    const createdCar: Car | undefined = await createCar(options);
    if (createdCar) return createdCar;
    throw new Error('createdCar is undefined');
  }

  public async CRUDCars(action: CRUD, options: CRUDOptions): Promise<CRUDResult> {
    switch (action) {
      case CRUD.ReadPage:
        if (options.page) {
          return this.getCarsOnPage(options.page);
        }
        break;
      case CRUD.Create:
        return this.getCreatedCar(options);
      default:
        break;
    }
    throw new Error('CRUD option is invalid');
  }
}
