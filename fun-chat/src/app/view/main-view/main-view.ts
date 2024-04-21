import { Events, MessageStatus, ServerMsgSend, ServerUserData } from '../../../interfaces';
import { dispatch } from '../../services/events-service';
import { createElem } from '../../utils/create-elem';
import { getFormatTime } from '../../utils/get-format-time';
import { isMatch } from '../../utils/is-match';
import { container } from '../components/container/container';
import { footer } from '../components/main-page/footer/footer';
import { header, username } from '../components/main-page/header/header';
import {
  chatHint,
  dialogueContent,
  dialogueInput,
  dialogueSend,
  interlocutorName,
  interlocutorStatus,
  main,
  mainUsers,
  searchInput
} from '../components/main-page/main/main';

document.addEventListener('click', (event: MouseEvent) => {
  const target: EventTarget | null = event.target;
  const contextMenu: HTMLElement | null = document.querySelector('.main__dialogue_context-menu');

  if (target instanceof HTMLElement && contextMenu) {
    if (!contextMenu.contains(target)) contextMenu.remove();
  }
});

export function drawMainPage() {
  container.append(header, main, footer);
  dialogueContent.scrollTop = dialogueContent.scrollHeight;
}

function createUserElem(login: string, isLogined: boolean): HTMLLIElement {
  const userElem: HTMLLIElement = createElem('li', { class: 'main__user' });
  const userLogin: HTMLSpanElement = createElem('span', { class: 'main__user_login' });
  userLogin.textContent = login;
  userElem.append(userLogin);

  const userStatusClass: string = isLogined ? 'main__user_active' : 'main__user_inactive';
  userElem.classList.add(userStatusClass);

  return userElem;
}

export function updateMainPageData(users: ServerUserData[], currentUserLogin: string): void {
  username.textContent = currentUserLogin;

  users.forEach((user: ServerUserData) => {
    if (user.login !== currentUserLogin) {
      const userElem: HTMLLIElement = createUserElem(user.login, user.isLogined);

      if (userElem.classList.contains('main__user_active')) {
        mainUsers.prepend(userElem);
      } else mainUsers.append(userElem);
    }
  });
  dispatch(Events.HandleUserSelect);
}

export function updateUserList(template: string): void {
  const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));

  allUserElems.forEach((userElem: HTMLLIElement) => {
    const userElemLink: HTMLLIElement = userElem;
    if (!isMatch(userElemLink.textContent ?? '', template)) {
      userElemLink.hidden = true;
    } else userElemLink.removeAttribute('hidden');
  });
}

function updateInterlocutorStatus(isOnline: boolean): void {
  if (isOnline) {
    interlocutorStatus.textContent = 'Online';
    interlocutorStatus.classList.remove('offline');
    interlocutorStatus.classList.add('online');
  } else {
    interlocutorStatus.textContent = 'Offline';
    interlocutorStatus.classList.remove('online');
    interlocutorStatus.classList.add('offline');
  }
}

export function updateUserStatus(login: string, isLogined: boolean) {
  if (login === interlocutorName.textContent) {
    updateInterlocutorStatus(isLogined);
  }
  const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));

  let targetUser: HTMLLIElement | undefined = allUserElems.find(
    (userElem: HTMLLIElement): boolean => userElem.firstElementChild?.textContent === login
  );

  if (!targetUser) {
    targetUser = createUserElem(login, isLogined);
  }

  if (isLogined) {
    targetUser.classList.remove('main__user_inactive');
    targetUser.classList.add('main__user_active');
    mainUsers.prepend(targetUser);
  } else {
    targetUser.classList.remove('main__user_active');
    targetUser.classList.add('main__user_inactive');
    mainUsers.append(targetUser);
  }
  dispatch(Events.HandleUserSelect);
}

export function clearMainPage(): void {
  mainUsers.replaceChildren('');
  dialogueContent.replaceChildren('');

  searchInput.value = '';
  dialogueInput.value = '';
  dialogueInput.disabled = true;
  dialogueSend.disabled = true;

  interlocutorName.textContent = '';
  interlocutorStatus.textContent = '';

  dialogueContent.classList.add('empty');
  dialogueContent.append(chatHint);
  chatHint.textContent = 'Select a person to talk with';
}

export function showSelectedUser(userElem: HTMLElement): void {
  const userFirstChild: Element | null = userElem.firstElementChild;
  if (!userFirstChild || !userFirstChild.textContent)
    throw new Error('userFirstChild is not found or empty textContent');

  const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));
  allUserElems.forEach((user: HTMLLIElement) => user.classList.remove('selected'));
  userElem.classList.add('selected');

  interlocutorName.textContent = userFirstChild.textContent;

  if (userElem.classList.contains('main__user_active')) {
    updateInterlocutorStatus(true);
  } else updateInterlocutorStatus(false);
}

export function markMessagesStatus(message: HTMLElement, status: Partial<MessageStatus>): void {
  if ('isDeleted' in status && status.isDeleted) {
    message.remove();
  } else {
    const messageFooter: Element | undefined | null = message.lastElementChild?.lastElementChild;
    const statusElem: Element | null | undefined = messageFooter?.lastElementChild;

    if ('isEdited' in status && status.isEdited) {
      const editedElem: HTMLSpanElement = createElem('span', {
        class: 'main__dialogue_edited-status'
      });
      editedElem.textContent = 'Edited';
      if (!messageFooter) throw new Error('messageFooter not found');
      messageFooter.prepend(editedElem);
    }

    if (message.classList.contains('interlocutor-message')) return;
    if (!statusElem) throw new Error('statusElem not found');
    if ('isReaded' in status && status.isReaded) statusElem.textContent = 'read';
    if ('isDelivered' in status && status.isDelivered) statusElem.textContent = 'delivered';
  }
}

function createMessageParts(): HTMLElement[] {
  const messageWrapper: HTMLDivElement = createElem('div', {
    class: 'main__dialogue_message-wrapper'
  });
  const messageElem: HTMLDivElement = createElem('div', { class: 'main__dialogue_message' });
  const messageHeader: HTMLParagraphElement = createElem('p', {
    class: 'main__dialogue_message-header'
  });
  const textElem: HTMLParagraphElement = createElem('p', {
    class: 'main__dialogue_message-text'
  });
  const messageFooter: HTMLParagraphElement = createElem('p', {
    class: 'main__dialogue_message-footer'
  });

  return [messageWrapper, messageElem, messageHeader, textElem, messageFooter];
}

export function incrementUnreadMsgCount(message: ServerMsgSend): void {
  const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));
  const targetUser: HTMLLIElement | undefined = allUserElems.find(
    (userElem: HTMLLIElement): boolean => userElem.firstElementChild?.textContent === message.from
  );
  if (!targetUser) throw new Error('targetUser not found');

  const targetLastElem: Element | null = targetUser.lastElementChild;
  if (!targetLastElem) throw new Error('targetLastElem not found');

  if (targetLastElem.classList.contains('main__user_new-messages-count')) {
    targetLastElem.textContent = (Number(targetLastElem.textContent) + 1).toString();
  } else {
    const countElem: HTMLDivElement = createElem('div', {
      class: 'main__user_new-messages-count'
    });
    countElem.textContent = '1';
    targetUser.append(countElem);
  }
}

export function markUnreadMsgCount(messages: ServerMsgSend[]): void {
  const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));
  const interlocutorMessages: ServerMsgSend[] = [...messages].filter(
    (message: ServerMsgSend) => message.from !== username.textContent
  );
  if (!interlocutorMessages.length) return;

  const targetUser: HTMLLIElement | undefined = allUserElems.find(
    (userElem: HTMLLIElement): boolean =>
      userElem.firstElementChild?.textContent === interlocutorMessages[0].from
  );
  if (!targetUser) throw new Error('targetUser not found');

  let unreadMsgCount: number = 0;
  interlocutorMessages.forEach((message: ServerMsgSend) => {
    const targetLastElem: Element | null = targetUser.lastElementChild;
    if (targetLastElem && targetLastElem.classList.contains('main__user_new-messages-count'))
      targetLastElem.remove();
    if (!message.status.isReaded) unreadMsgCount += 1;
  });

  if (unreadMsgCount) {
    const countElem: HTMLDivElement = createElem('div', {
      class: 'main__user_new-messages-count'
    });
    countElem.textContent = unreadMsgCount.toString();
    targetUser.append(countElem);
  }
}

export function drawMessage(message: ServerMsgSend): void {
  if (document.querySelector('.main__dialogue_hint')) dialogueContent.replaceChildren('');
  const [messageWrapper, messageElem, messageHeader, textElem, messageFooter]: HTMLElement[] =
    createMessageParts();
  messageWrapper.id = message.id;

  textElem.textContent = message.text;

  const timeElem: HTMLSpanElement = createElem('span', { class: 'main__dialogue_message-time' });
  timeElem.textContent = getFormatTime(message.datetime);
  const authorElem: HTMLSpanElement = createElem('span', {
    class: 'main__dialogue_message-author'
  });
  messageHeader.append(authorElem, timeElem);
  messageElem.append(messageHeader, textElem, messageFooter);
  messageWrapper.append(messageElem);

  if (message.from === interlocutorName.textContent) {
    messageWrapper.classList.add('interlocutor-message');
    authorElem.textContent = message.from;
    if (!message.status.isReaded) messageWrapper.classList.add('new-message');
  } else {
    messageWrapper.classList.add('own-message');
    authorElem.textContent = 'You';
    const statusElem: HTMLSpanElement = createElem('span', {
      class: 'main__dialogue_message-status'
    });

    statusElem.textContent = 'sent';
    messageFooter.append(statusElem);
    markMessagesStatus(messageWrapper, message.status);
  }

  dialogueContent.append(messageWrapper);
  dialogueContent.scrollTop = dialogueContent.scrollHeight;
}

export function showMessageHistory(messages: ServerMsgSend[]): void {
  dialogueInput.disabled = false;
  dialogueSend.disabled = false;
  dialogueContent.replaceChildren('');

  const isInterlocutorSelected: boolean = interlocutorName.textContent !== '';

  if (messages.length && isInterlocutorSelected) {
    dialogueContent.classList.remove('empty');
    messages.forEach((message: ServerMsgSend) => {
      drawMessage(message);
    });
  } else if (!isInterlocutorSelected) {
    dialogueInput.disabled = true;
    dialogueSend.disabled = true;
    dialogueContent.classList.add('empty');

    dialogueContent.append(chatHint);
    chatHint.textContent = 'Select a person to talk with';
  } else {
    dialogueContent.classList.add('empty');
    dialogueContent.append(chatHint);
    chatHint.textContent = 'Send the first message to the user';
  }
}

export function showContextMenu(messageElem: HTMLElement): void {
  const contextMenu: HTMLFormElement = createElem('form', { class: 'main__dialogue_context-menu' });

  const editBtn: HTMLButtonElement = createElem('button', { class: 'main__dialogue_edit-btn' });
  editBtn.textContent = 'Edit';
  const deleteBtn: HTMLButtonElement = createElem('button', { class: 'main__dialogue_delete-btn' });
  deleteBtn.textContent = 'Delete';

  contextMenu.append(editBtn, deleteBtn);
  messageElem.append(contextMenu);
}

export function removeMessage(messageElem: HTMLElement): void {
  messageElem.remove();
  const isHistoryClear: boolean = Boolean(
    document.querySelector('.main__dialogue_message-wrapper')
  );

  if (!isHistoryClear) {
    dialogueContent.classList.add('empty');
    dialogueContent.append(chatHint);
    chatHint.textContent = 'Send the first message to the user';
  }
}

export function startEditMessage(messageText: string): void {
  dialogueInput.value = messageText;
  dialogueSend.classList.add('edit');
  dialogueSend.textContent = 'Edit';
}

export function endEditMessage(): void {
  dialogueInput.value = '';
  dialogueSend.classList.remove('edit');
  dialogueSend.textContent = 'Send';
}

export function editMessage(messageElem: HTMLElement, editingText: string): void {
  const textElem: Element | null | undefined =
    messageElem.lastElementChild?.firstElementChild?.nextElementSibling;
  if (!textElem) throw new Error('textElem not found');

  textElem.textContent = editingText;
  markMessagesStatus(messageElem, { isEdited: true });
}
