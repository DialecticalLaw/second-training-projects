import { Car, PageInfo } from '../../../interfaces';
import { garage } from '../components/garage/garage';
import { carCardCreator } from '../components/garage/garage_info/car/car';

export class GarageView {
  private garage: HTMLDivElement;

  private carsBlock?: HTMLDivElement | null;

  private carsCountElem?: HTMLSpanElement;

  private pageNumberElem?: HTMLSpanElement;

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
        if (carsBlock) {
          this.carsBlock = carsBlock;
          carsBlock.append(carCard);
        } else throw new Error('carsBlock is undefined');
      }
    });
  }

  public clearCarsBlock(): void {
    if (this.carsBlock) {
      this.carsBlock?.replaceChildren();
    } else throw new Error('carsBlock is undefined');
  }

  public updateGarageInfo(totalCars: number, page: number): void {
    if (this.carsCountElem && this.pageNumberElem) {
      this.carsCountElem.textContent = totalCars.toString();
      this.pageNumberElem.textContent = page.toString();
    } else {
      const carsCountElem: HTMLSpanElement | null = document.querySelector('.garage__cars-count');
      const pageNumberElem: HTMLSpanElement | null = document.querySelector('.garage__page_number');

      if (carsCountElem && pageNumberElem) {
        this.carsCountElem = carsCountElem;
        this.pageNumberElem = pageNumberElem;
        carsCountElem.textContent = totalCars.toString();
        pageNumberElem.textContent = page.toString();
      } else throw new Error('carsCount or pageNumber element is undefined');
    }
  }
}
