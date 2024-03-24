import { PageInfo } from '../../interfaces';
import { getCars } from '../services/race_api_garage_service';

export class Model {
  private totalCars?: number;

  public async getCarsOnPage(page: number): Promise<PageInfo | undefined> {
    const result: PageInfo | undefined = await getCars(page);
    if (result) {
      this.totalCars = result.total;
      return result;
    }
    throw new Error('PageInfo is undefined at getCarsOnPage');
  }
}
