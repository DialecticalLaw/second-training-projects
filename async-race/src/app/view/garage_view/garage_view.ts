import { garage } from '../components/garage/garage';

export class GarageView {
  garage: HTMLDivElement;

  constructor() {
    this.garage = garage;
  }

  public draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error('main is undefined');
    main.append(this.garage);
  }
}
