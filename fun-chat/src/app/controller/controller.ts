import { Events, Page } from '../../interfaces';
import { Model } from '../model/model';
import { Router } from '../router/router';
import { drawMainMarkup, toggleWaitingConnectWindow } from '../view/app-view';
import { LoginController } from './login-controller';
import { infoBtn } from '../view/components/container/container';
import { backBtn } from '../view/components/info-page/info-page';
import { ErrorController } from './error-controller';

export class Controller {
  private loginController: LoginController;

  private errorController: ErrorController;

  private model: Model;

  constructor() {
    this.model = new Model();
    this.loginController = new LoginController(this.model);
    this.errorController = new ErrorController(this.model);

    document.addEventListener(Events.CloseConnect, () => {
      toggleWaitingConnectWindow(true);
      this.model.connect();
    });

    document.addEventListener(Events.ErrorConnect, () => {
      toggleWaitingConnectWindow(true);
    });

    document.addEventListener(Events.Connect, () => {
      toggleWaitingConnectWindow(false);
    });
  }

  public init(): void {
    drawMainMarkup();
    Router.moveToPage(Page.Login);
    toggleWaitingConnectWindow(true);
    this.handleActions();
    this.model.connect();
  }

  private handleActions(): void {
    this.loginController.handleLoginActions();

    infoBtn.addEventListener('click', () => {
      Router.moveToPage(Page.Info);
    });
    backBtn.addEventListener('click', () => {
      window.history.back();
    });
  }
}
