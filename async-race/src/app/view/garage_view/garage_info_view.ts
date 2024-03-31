import { Car, CarProps, HandleAction, GaragePageInfo } from '../../../interfaces';
import { carCardCreator } from '../components/garage/garage_info/car/car';
import {
  carsCountElem,
  garageCarsBlock,
  pageNumberElem
} from '../components/garage/garage_info/garage_info';
import { winnerDescription, winnerWrapper } from '../components/garage/winner/winner';
import { handleActionRequest } from '../handleRequestEvent';

export class GarageInfoView {
  private carsBlock: HTMLDivElement;

  private carsCountElem: HTMLSpanElement;

  private pageNumberElem: HTMLSpanElement;

  private winnerDescription: HTMLDivElement;

  private winnerWrapper: HTMLDivElement;

  constructor() {
    this.carsBlock = garageCarsBlock;
    this.carsCountElem = carsCountElem;
    this.pageNumberElem = pageNumberElem;
    this.winnerWrapper = winnerWrapper;
    this.winnerDescription = winnerDescription;
  }

  private drawCars(pageInfo: GaragePageInfo): void {
    pageInfo.cars.forEach((car: Car) => {
      const carCard: HTMLDivElement = carCardCreator(car);
      this.carsBlock.append(carCard);
    });
  }

  public updatePage(pageInfo: GaragePageInfo): void {
    this.carsBlock.innerHTML = '';
    this.drawCars(pageInfo);
    this.carsCountElem.textContent = pageInfo.total.toString();
    this.pageNumberElem.textContent = pageInfo.page.toString();
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
    const carIcon: HTMLDivElement | null = document.querySelector(`[id="${id}"] .garage__car_icon`);
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

  public showWinner(id: string | false): void {
    if (id === false) {
      this.winnerDescription.innerHTML = 'There are no winners &#128549;';
      this.winnerWrapper.classList.add('winner-active');
    } else {
      const carCard: HTMLDivElement | null = document.querySelector(`[id="${id}"]`);
      const carIcon: HTMLDivElement | null = document.querySelector(
        `[id="${id}"] .garage__car_icon`
      );
      if (!carIcon || !carCard) throw new Error('carIcon or carCard is undefined');

      let carName: string | null | undefined =
        carCard.firstElementChild?.lastElementChild?.textContent;
      if (!carName) carName = 'untitled';
      const transition: string = carIcon.style.transitionDuration;
      const time: string = Number(transition.slice(0, transition.length - 1)).toFixed(2);

      this.winnerDescription.innerHTML = `<span class="winner__name">${carName}</span> won in <span class="winner__time">${time}</span> seconds!`;
      this.winnerWrapper.classList.add('winner-active');
    }
  }

  public hideWinner(): void {
    this.winnerWrapper.classList.remove('winner-active');
    const winnerWrapperClosingTime: number = 400;

    setTimeout(() => {
      this.winnerDescription.innerHTML = '';
    }, winnerWrapperClosingTime);
  }
}
