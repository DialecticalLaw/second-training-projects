import garage from '../components/garage/garage';

export default class GarageView {
  public draw(): void {
    const main = document.querySelector('.main');
    if (!main) throw new Error('main is undefined');
    main.append(garage);
  }
}
