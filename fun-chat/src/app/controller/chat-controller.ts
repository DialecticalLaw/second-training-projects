import { Events } from '../../interfaces';
import { Model } from '../model/model';
import {
  dialogueInput,
  dialogueSend,
  interlocutorName,
  searchInput
} from '../view/components/main-page/main/main';
import {
  drawMessage,
  showMessageHistory,
  showSelectedUser,
  updateUserList,
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
      updateUserList(searchInput.value);
    });

    document.addEventListener(Events.MessageHistory, (event: Event) => {
      if (event instanceof CustomEvent) {
        showMessageHistory(event.detail.messages);
      }
    });

    dialogueSend.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this.sendMessage.call(this, dialogueInput.value);
      dialogueInput.value = '';
    });

    document.addEventListener(Events.ReceivedMessage, (event: Event) => {
      if (
        event instanceof CustomEvent &&
        (event.detail.message.from === interlocutorName.textContent ||
          event.detail.message.from === model.login)
      ) {
        drawMessage(event.detail.message);
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

  private sendMessage(message: string): void {
    if (message.trim() === '') return;
    if (!interlocutorName.textContent) throw new Error('interlocutor name is null');
    this.model.sendMessage(interlocutorName.textContent, message.trim());
  }
}
