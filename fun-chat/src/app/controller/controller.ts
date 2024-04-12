import { Events, HandleAction, Page } from '../../interfaces';
import { handleActionRequest } from '../services/events-service';
import { Model } from '../model/model';
import { Router } from '../router/router';
import { drawMainMarkup, toggleWaitingConnectWindow } from '../view/app-view';
import { LoginController } from './login-controller';

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
    document.addEventListener(Events.Disconnection, async () => {
      toggleWaitingConnectWindow(true);
      await this.model.connect();
      toggleWaitingConnectWindow(false);
    });
  }

  public async init(): Promise<void> {
    drawMainMarkup();
    Router.moveToPage(Page.Login);
    toggleWaitingConnectWindow(true);
    await this.model.connect();
    toggleWaitingConnectWindow(false);
    this.handleActions();
    handleInitActions();
  }

  private handleActions(): void {
    document.addEventListener(
      HandleAction.Login,
      this.loginController.handleLoginActions.bind(this.loginController)
    );
  }
}
