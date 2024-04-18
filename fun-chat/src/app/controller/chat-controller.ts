import { Events } from '../../interfaces';
import { Model } from '../model/model';
import { isMatch } from '../utils/is-match';
import { searchInput } from '../view/components/main-page/main/main';
import {
  showMessageHistory,
  showSelectedUser,
  updateUserStatus
} from '../view/main-view/main-view';

export class ChatController {
  model: Model;

  constructor(model: Model) {
    this.model = model;

    document.addEventListener(Events.ThirdParty, (event: Event) => {
      if (event instanceof CustomEvent) {
        updateUserStatus(event.detail.login, event.detail.isLogined);
        searchInput.dispatchEvent(new InputEvent('input'));
      }
    });

    document.addEventListener(Events.HandleUserSelect, this.handleUserSelect.bind(this));

    searchInput.addEventListener('input', () => {
      const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));

      allUserElems.forEach((userElem: HTMLLIElement) => {
        const userElemLink: HTMLLIElement = userElem;
        if (!isMatch(userElemLink.textContent ?? '', searchInput.value)) {
          userElemLink.hidden = true;
        } else userElemLink.removeAttribute('hidden');
      });
    });

    document.addEventListener(Events.MessageHistory, (event: Event) => {
      if (event instanceof CustomEvent) {
        showMessageHistory(event.detail.messages);
      }
    });
  }

  private handleUserSelect(): void {
    const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));

    allUserElems.forEach((user: HTMLLIElement) => {
      const userLink = user;

      if (!user.onclick) {
        userLink.onclick = (event: MouseEvent) => {
          const eventTarget: EventTarget | null = event.target;
          if (eventTarget instanceof HTMLElement) {
            this.selectUser(eventTarget);
          }
        };
      }
    });
  }

  private selectUser(userElem: HTMLElement): void {
    if (!userElem.textContent) throw new Error('userElem textContent is null');
    this.model.getMessageHistory(userElem.textContent);
    showSelectedUser(userElem);
  }
}
