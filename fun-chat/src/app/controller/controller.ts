import { HandleAction, Page } from '../../interfaces';
import { handleActionRequest } from '../handleActionRequest';
import { Router } from '../router/router';
import { drawMainMarkup } from '../view/app-view';
import { LoginController } from './login-controller';

function handleInitActions(): void {
  const initHandleActionsKeys: HandleAction[] = [HandleAction.Login, HandleAction.Info];

  for (let i = 0; i < initHandleActionsKeys.length; i += 1) {
    handleActionRequest(initHandleActionsKeys[i]);
  }
}

export class Controller {
  private loginController: LoginController;

  constructor() {
    this.loginController = new LoginController();
  }

  public init(): void {
    drawMainMarkup();
    Router.moveToPage(Page.Login);
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
