import { Events } from '../../interfaces';
import { Model } from '../model/model';
import { updateUserStatus } from '../view/main-view/main-view';

export class ChatController {
  model: Model;

  constructor(model: Model) {
    this.model = model;

    document.addEventListener(Events.ThirdParty, (event: Event) => {
      if (event instanceof CustomEvent) {
        updateUserStatus(event.detail.login, event.detail.isLogined);
      }
    });
  }
}
