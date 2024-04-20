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
  markMessagesStatus,
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

    dialogueSend.addEventListener('click', this.sendMessage.bind(this));
    document.addEventListener(Events.ReceivedMessage, this.receiveMessage.bind(this));
    document.addEventListener(Events.Notification, ChatController.receiveNotification);
  }

  private static receiveNotification(event: Event): void {
    if (!(event instanceof CustomEvent)) throw new Error('event is not custom');
    const messageInfo = event.detail.message;

    if ('isDelivered' in messageInfo.status && messageInfo.status.isDelivered) {
      const messageElem: HTMLElement | null = document.querySelector(`[id="${messageInfo.id}"]`);
      if (messageElem) markMessagesStatus([messageElem], messageInfo.status);
    }
  }

  private receiveMessage(event: Event): void {
    if (
      event instanceof CustomEvent &&
      (event.detail.message.from === interlocutorName.textContent ||
        event.detail.message.from === this.model.login)
    ) {
      drawMessage(event.detail.message);
    }
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

  private sendMessage(event: MouseEvent): void {
    event.preventDefault();
    if (dialogueInput.value.trim() === '') {
      dialogueInput.value = '';
      return;
    }

    if (!interlocutorName.textContent) throw new Error('interlocutor name is null');
    this.model.sendMessage(interlocutorName.textContent, dialogueInput.value.trim());
    dialogueInput.value = '';
  }
}
