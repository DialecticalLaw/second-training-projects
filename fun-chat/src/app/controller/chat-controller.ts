import { Events } from '../../interfaces';
import { Model } from '../model/model';
import { isMatch } from '../utils/is-match';
import { searchInput } from '../view/components/main-page/main/main';
import { updateUserStatus } from '../view/main-view/main-view';

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

    searchInput.addEventListener('input', () => {
      const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));
      allUserElems.forEach((userElem: HTMLLIElement) => {
        const userElemLink: HTMLLIElement = userElem;
        if (!isMatch(userElemLink.textContent ?? '', searchInput.value)) {
          userElemLink.hidden = true;
        } else userElemLink.removeAttribute('hidden');
      });
    });
  }
}
