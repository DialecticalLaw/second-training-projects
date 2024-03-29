import { Car, CarProps, HandleAction, PageInfo } from '../../../interfaces';
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
    handleActionRequest(HandleAction.Gas);
    handleActionRequest(HandleAction.Brake);
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
    }
  }

  public static moveCar(id: string, carProps: CarProps | 'reset' | 'stop'): void {
    const carIcon: HTMLElement | null = document.querySelector(`[id="${id}"] .garage__car_icon`);
    if (!carIcon) throw new Error('carIcon is undefined');

    if (carProps === 'reset') {
      carIcon.removeAttribute('style');
      carIcon.classList.remove('garage__car_broken');
    } else if (carProps === 'stop') {
      carIcon.classList.add('garage__car_broken');
      const carCard: HTMLDivElement | null = document.querySelector(`[id="${id}"]`);
      if (!carCard) throw new Error('carCard is undefined');

      const carCardLeft = carCard.getBoundingClientRect().left;
      const currentLeft = carIcon.getBoundingClientRect().left - carCardLeft;
      carIcon.style.left = `${currentLeft}px`;
    } else {
      const transition: number = carProps.distance / carProps.velocity / 1000;
      carIcon.style.transition = `${transition}s ease-in-out`;
      carIcon.style.left = 'calc(100% - 100px)';
    }
  }
}
