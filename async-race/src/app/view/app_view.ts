import { app } from '../..';
import {
  HandleAction,
  PageInfo,
  SwitchDisplayAction,
  SwitchDisplayOptions
} from '../../interfaces';
import { container } from './components/container/container';
import { header } from './components/header/header';
import { main } from './components/main/main';
import { GarageView, removeCar, selectCar } from './garage_view/garage_view';

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
    app.handleActionRequest(HandleAction.Create);
    app.handleActionRequest(HandleAction.Select);
    app.handleActionRequest(HandleAction.Update);
    app.handleActionRequest(HandleAction.Delete);
  }

  public switchComponentDisplay(action: SwitchDisplayAction, options: SwitchDisplayOptions): void {
    switch (action) {
      case SwitchDisplayAction.UpdatePage:
        if (options.pageInfo) {
          this.garageView.clearCarsBlock();
          this.garageView.drawCars(options.pageInfo);
          app.handleActionRequest(HandleAction.Select);
          app.handleActionRequest(HandleAction.Delete);
        }
        break;
      case SwitchDisplayAction.SelectCar:
        if (options.event) selectCar(options.event);
        break;
      case SwitchDisplayAction.RemoveCar:
        if (options.elem) removeCar(options.elem);
        break;
      default:
        break;
    }
  }
}
