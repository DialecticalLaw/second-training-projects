import { Car, HandleAction, PageInfo } from '../../../interfaces';
import { carCardCreator } from '../components/garage/garage_info/car/car';
import {
  carsCountElem,
  garageCarsBlock,
  pageNumberElem
} from '../components/garage/garage_info/garage_info';
import { handleActionRequest } from '../handleRequestEvent';

export class GarageInfoView {
  private carsBlock: HTMLDivElement;

  private carsCountElem: HTMLSpanElement;

  private pageNumberElem: HTMLSpanElement;

  constructor() {
    this.carsBlock = garageCarsBlock;
    this.carsCountElem = carsCountElem;
    this.pageNumberElem = pageNumberElem;
  }

  public drawCars(pageInfo: PageInfo): void {
    pageInfo.cars.forEach((car: Car) => {
      const carCard: HTMLDivElement = carCardCreator(car);
      this.carsBlock.append(carCard);
    });
  }

  public updateGarageInfo(totalCars: number, page: number): void {
    this.carsCountElem.textContent = totalCars.toString();
    this.pageNumberElem.textContent = page.toString();
  }

  public updatePage(pageInfo: PageInfo): void {
    this.carsBlock.innerHTML = '';
    this.drawCars(pageInfo);
    this.updateGarageInfo(pageInfo.total, pageInfo.page);
    handleActionRequest(HandleAction.Select);
    handleActionRequest(HandleAction.Delete);
  }

  public static selectCar(event: MouseEvent): void {
    const eventTarget: EventTarget | null = event.target;
    if (eventTarget instanceof HTMLButtonElement) {
      const allCars: HTMLDivElement[] = Array.from(document.querySelectorAll('.garage__car_card'));
      allCars.forEach((card: HTMLDivElement) => card.classList.remove('selected'));

      const allCarNames: HTMLParagraphElement[] = Array.from(
        document.querySelectorAll('.garage__car_name')
      );
      allCarNames.forEach((carName: HTMLParagraphElement) => carName.classList.remove('selected'));

      const carCard: HTMLElement | null | undefined = eventTarget.parentElement?.parentElement;
      const carName: Element | null | undefined = eventTarget.parentElement?.lastElementChild;
      if (!carCard || !carName) throw new Error('carCard or carName is undefined');

      carCard.classList.add('selected');
      carName.classList.add('selected');
      // this.updateBtn.classList.remove('disabled');
    }
  }
}
