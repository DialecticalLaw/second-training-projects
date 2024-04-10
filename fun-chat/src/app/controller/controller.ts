import { Page } from '../../interfaces';
import { Router } from '../router/router';
import { drawMainMarkup } from '../view/app-view';

export class Controller {
  public static init(): void {
    drawMainMarkup();
    Router.moveToPage(Page.Login);
  }
}
