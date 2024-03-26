import {
  HandleAction,
  PageInfo,
  SwitchDisplayAction,
  SwitchDisplayOptions
} from '../../interfaces';
import { container } from './components/container/container';
import { header } from './components/header/header';
import { main } from './components/main/main';
import { GarageView, selectCar } from './garage_view/garage_view';
import { handleActionRequest } from './handleRequestEvent';

function drawMainMarkup(): void {
  const body = document.querySelector('body');
  if (!body) throw new Error('body is undefined');

  body.append(container);
  container.append(header, main);
}

function dispatchInitEvents(): void {
  handleActionRequest(HandleAction.Create);
  handleActionRequest(HandleAction.Update);
  handleActionRequest(HandleAction.Select);
  handleActionRequest(HandleAction.Delete);
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
    dispatchInitEvents();
  }

  public switchComponentDisplay(action: SwitchDisplayAction, options: SwitchDisplayOptions): void {
    switch (action) {
      case SwitchDisplayAction.UpdatePage:
        if (options.pageInfo) {
          this.garageView.clearCarsBlock();
          this.garageView.drawCars(options.pageInfo);
          this.garageView.updateGarageInfo(options.pageInfo.total, options.pageInfo.page);
          handleActionRequest(HandleAction.Select);
          handleActionRequest(HandleAction.Delete);
        }
        break;
      case SwitchDisplayAction.SelectCar:
        if (options.event) selectCar(options.event);
        break;
      default:
        break;
    }
  }
}
