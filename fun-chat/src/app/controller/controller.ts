import { Events, HandleAction, Page } from '../../interfaces';
import { handleActionRequest } from '../services/events-service';
import { Model } from '../model/model';
import { Router } from '../router/router';
import { drawMainMarkup, toggleWaitingConnectWindow } from '../view/app-view';
import { LoginController } from './login-controller';
import { infoBtn } from '../view/components/container/container';
import { backBtn } from '../view/components/info-page/info-page';

function handleInitActions(): void {
  const initHandleActionsKeys: HandleAction[] = [HandleAction.Login, HandleAction.Info];

  for (let i = 0; i < initHandleActionsKeys.length; i += 1) {
    handleActionRequest(initHandleActionsKeys[i]);
  }
}

export class Controller {
  private loginController: LoginController;

  private model: Model;

  constructor() {
    this.model = new Model();
    this.loginController = new LoginController(this.model);

    document.addEventListener(Events.CloseConnect, async () => {
      toggleWaitingConnectWindow(true);
      await this.model.connect();
    });

    document.addEventListener(Events.ErrorConnect, async () => {
      toggleWaitingConnectWindow(true);
    });

    document.addEventListener(Events.Connect, async () => {
      toggleWaitingConnectWindow(false);
    });
  }

  public init(): void {
    drawMainMarkup();
    Router.moveToPage(Page.Login);
    toggleWaitingConnectWindow(true);
    this.handleActions();
    handleInitActions();
    this.model.connect();
  }

  private handleActions(): void {
    document.addEventListener(
      HandleAction.Login,
      this.loginController.handleLoginActions.bind(this.loginController)
    );

    document.addEventListener(HandleAction.Info, () => {
      infoBtn.addEventListener('click', () => {
        Router.moveToPage(Page.Info);
      });
      backBtn.addEventListener('click', () => {
        window.history.back();
      });
    });
  }
}
