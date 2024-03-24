import { Car, PageInfo } from '../../../interfaces';
import { garage } from '../components/garage/garage';
import { carCardCreator } from '../components/garage/garage_info/car/car';

export class GarageView {
  private garage: HTMLDivElement;

  private carsBlock?: HTMLDivElement | null;

  constructor() {
    this.garage = garage;
  }

  public draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error('main is undefined');
    main.append(this.garage);
  }

  public drawCars(pageInfo: PageInfo): void {
    pageInfo.cars.forEach((car: Car) => {
      const carCard: HTMLDivElement = carCardCreator(car);
      if (this.carsBlock) {
        this.carsBlock.append(carCard);
      } else {
        const carsBlock: HTMLDivElement | null = document.querySelector('.garage__cars-block');
        this.carsBlock = carsBlock;
        carsBlock?.append(carCard);
      }
    });
  }
}
