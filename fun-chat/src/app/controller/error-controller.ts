import { Events } from '../../interfaces';
import { Model } from '../model/model';
import { clearLogin, markError } from '../view/login-view/login-view';

export class ErrorController {
  private model: Model;

  constructor(model: Model) {
    this.model = model;

    document.addEventListener(Events.IncorrectPassword, () => {
      clearLogin();
      markError(Events.IncorrectPassword);
    });

    document.addEventListener(Events.AlreadyAuth, () => {
      clearLogin();
      markError(Events.AlreadyAuth);
    });
  }
}
