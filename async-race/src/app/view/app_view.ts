import { PageInfo } from '../../interfaces';
import { container } from './components/container/container';
import { header } from './components/header/header';
import { main } from './components/main/main';
import { GarageView } from './garage_view/garage_view';

function drawMainMarkup(): void {
  const body = document.querySelector('body');
  if (!body) throw new Error('body is undefined');

  body.append(container);
  container.append(header, main);
}

export class AppView {
  private garageView: GarageView;

  constructor() {
    this.garageView = new GarageView();
  }

  public start(pageInfo: PageInfo): void {
    drawMainMarkup();
    this.garageView.draw();
    this.garageView.drawCars(pageInfo);
    this.garageView.updateGarageInfo(pageInfo.total, pageInfo.page);
  }
}
