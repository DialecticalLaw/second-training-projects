import { scrollState } from '../..';
import { Events, NotificationType } from '../../interfaces';
import { Model } from '../model/model';
import { dispatch } from '../services/events-service';
import {
  dialogueContent,
  dialogueInput,
  dialogueSend,
  interlocutorName,
  searchInput
} from '../view/components/main-page/main/main';
import {
  drawMessage,
  startEditMessage,
  markMessagesStatus,
  removeMessage,
  showContextMenu,
  showMessageHistory,
  showSelectedUser,
  updateUserList,
  updateUserStatus,
  endEditMessage,
  editMessage,
  markUnreadMsgCount,
  incrementUnreadMsgCount
} from '../view/main-view/main-view';

function receiveNotification(event: Event): void {
  if (!(event instanceof CustomEvent)) throw new Error('event is not custom');
  const messageInfo = event.detail.message;
  const messageElem: HTMLElement | null = document.querySelector(`[id="${messageInfo.id}"]`);

  if ('isDelivered' in messageInfo.status && messageInfo.status.isDelivered) {
    if (messageElem) markMessagesStatus(messageElem, messageInfo.status);
  } else if ('isDeleted' in messageInfo.status && messageInfo.status.isDeleted) {
    if (messageElem) removeMessage(messageElem);
  } else if ('isEdited' in messageInfo.status && messageInfo.status.isEdited) {
    if (messageElem) editMessage(messageElem, messageInfo.text);
  } else if ('isReaded' in messageInfo.status && messageInfo.status.isReaded) {
    if (messageElem) markMessagesStatus(messageElem, messageInfo.status);
  }
}

dialogueContent.addEventListener('click', () => {
  dispatch(Events.ReadMessages);
});

dialogueContent.addEventListener('scroll', () => {
  if (scrollState.isScrollByUser) dispatch(Events.ReadMessages);
});

dialogueContent.addEventListener('scrollend', () => {
  scrollState.isScrollByUser = true;
});

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
        markUnreadMsgCount(event.detail.messages);
        this.handleContextMenuOpen();
      }
    });

    dialogueSend.addEventListener('click', this.sendMessage.bind(this));
    document.addEventListener(Events.ReceivedMessage, this.receiveMessage.bind(this));
    document.addEventListener(Events.Notification, receiveNotification);
    document.addEventListener(Events.ReadMessages, this.readMessages.bind(this));
  }

  private readMessages(): void {
    const allMessageWrappers: HTMLElement[] = Array.from(
      document.querySelectorAll('.main__dialogue_message-wrapper')
    );
    const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));
    const selectedUser = allUserElems.find((user) => user.classList.contains('selected'));

    if (
      !selectedUser ||
      !selectedUser.lastElementChild?.classList.contains('main__user_new-messages-count')
    )
      return;
    selectedUser.lastElementChild.remove();

    allMessageWrappers.forEach((messageWrapper: HTMLElement) => {
      if (
        messageWrapper.classList.contains('interlocutor-message') &&
        messageWrapper.classList.contains('new-message')
      )
        this.model.sendNotificationMessage(NotificationType.Read, messageWrapper.id);
    });
  }

  private receiveMessage(event: Event): void {
    if (event instanceof CustomEvent) {
      if (event.detail.message.from !== this.model.login)
        incrementUnreadMsgCount(event.detail.message);

      if (
        event.detail.message.from === interlocutorName.textContent ||
        event.detail.message.from === this.model.login
      ) {
        drawMessage(event.detail.message);
        this.handleContextMenuOpen();
      }
    }
  }

  private handleContextMenuOpen(): void {
    const allMessageElems: HTMLElement[] = Array.from(
      document.querySelectorAll('.main__dialogue_message')
    );

    allMessageElems.forEach((elem: HTMLElement) => {
      const elemLink = elem;
      if (!elemLink.oncontextmenu) {
        elemLink.oncontextmenu = (event: MouseEvent) => {
          event.preventDefault();
          const target: EventTarget | null = event.currentTarget;
          const isMenuOpen: boolean = Boolean(
            elemLink.lastElementChild?.classList.contains('main__dialogue_context-menu')
          );

          if (
            target instanceof HTMLElement &&
            target.parentElement &&
            target.parentElement.classList.contains('own-message') &&
            !isMenuOpen
          ) {
            const contextMenu: HTMLElement | null = document.querySelector(
              '.main__dialogue_context-menu'
            );
            if (contextMenu) contextMenu.remove();

            showContextMenu(target);
            this.handleContextMenuActions();
          }
        };
      }
    });
  }

  private handleContextMenuActions(): void {
    const contextMenu: HTMLFormElement | null = document.querySelector(
      '.main__dialogue_context-menu'
    );
    const editBtn: HTMLButtonElement | null = document.querySelector('.main__dialogue_edit-btn');
    const deleteBtn: HTMLButtonElement | null = document.querySelector(
      '.main__dialogue_delete-btn'
    );

    if (editBtn && deleteBtn && contextMenu) {
      editBtn.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        const messageTextElem: Element | undefined | null =
          contextMenu.previousElementSibling?.previousElementSibling;
        const messageWrapper: HTMLElement | undefined | null =
          contextMenu.parentElement?.parentElement;
        if (!messageTextElem || !messageWrapper) throw new Error('message elem not found');

        startEditMessage(messageTextElem.textContent as string);
        this.model.editingMessageId = messageWrapper.id;
        contextMenu.remove();
      });

      deleteBtn.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        const messageWrapper: HTMLElement | undefined | null =
          contextMenu.parentElement?.parentElement;
        if (!messageWrapper) throw new Error('messageWrapper not found');
        this.model.sendNotificationMessage(NotificationType.Delete, messageWrapper.id);
        contextMenu.remove();
      });
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
    const userFirstChild: Element | null = userElem.firstElementChild;
    if (!userFirstChild || !userFirstChild.textContent)
      throw new Error('userFirstChild is not found or empty textContent');

    if (dialogueSend.classList.contains('edit')) endEditMessage();
    dialogueInput.value = '';
    showSelectedUser(userElem);
    this.model.getMessageHistory(userFirstChild.textContent);
  }

  private sendMessage(event: MouseEvent): void {
    event.preventDefault();
    dispatch(Events.ReadMessages);
    if (dialogueInput.value.trim() === '') {
      dialogueInput.value = '';
      if (dialogueSend.classList.contains('edit')) endEditMessage();
      return;
    }

    if (dialogueSend.classList.contains('edit') && this.model.editingMessageId) {
      this.model.sendNotificationMessage(
        NotificationType.Edit,
        this.model.editingMessageId,
        dialogueInput.value
      );
      endEditMessage();
      return;
    }

    if (!interlocutorName.textContent) throw new Error('interlocutor name is null');
    this.model.sendMessage(interlocutorName.textContent, dialogueInput.value.trim());
    dialogueInput.value = '';
  }
}
