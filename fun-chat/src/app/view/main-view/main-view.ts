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

export function drawMainPage() {
  container.append(header, main, footer);
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
    if (!(user.login === currentUserLogin)) {
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
    (userElem: HTMLLIElement): boolean => userElem.textContent === login
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

  dialogueContent.classList.add('empty');
  dialogueContent.append(chatHint);
  chatHint.textContent = 'Select a person to talk with';
}

export function showSelectedUser(userElem: HTMLElement): void {
  const allUserElems: HTMLLIElement[] = Array.from(document.querySelectorAll('.main__user'));
  allUserElems.forEach((user: HTMLLIElement) => user.classList.remove('selected'));
  userElem.classList.add('selected');

  interlocutorName.textContent = userElem.textContent;
  if (!userElem.textContent) throw new Error('userElem textContent is null');

  if (userElem.classList.contains('main__user_active')) {
    updateInterlocutorStatus(true);
  } else updateInterlocutorStatus(false);
}

export function updateMessageStatus(
  messageElems: HTMLElement[],
  status: Partial<MessageStatus>
): void {
  messageElems.forEach((message: HTMLElement) => {
    if ('isDeleted' in status && status.isDeleted) {
      message.remove();
    } else {
      const messageFooter: Element | null = message.lastElementChild;
      const statusElem: Element | null | undefined = messageFooter?.lastElementChild;
      if (!messageFooter || !statusElem) throw new Error('footer or status message is null');
      if (status.isEdited) {
        const editedElem: HTMLSpanElement = createElem('span', {
          class: 'main__dialogue_edited-status'
        });
        editedElem.textContent = 'Edited';
        messageFooter.prepend(editedElem);
      }

      if (status.isReaded) statusElem.textContent = 'read';
      if (status.isDelivered) statusElem.textContent = 'delivered';
    }
  });
}

function createMessageParts(): HTMLElement[] {
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

  return [messageElem, messageHeader, textElem, messageFooter];
}

export function drawMessage(message: ServerMsgSend): void {
  if (document.querySelector('.main__dialogue_hint')) dialogueContent.replaceChildren('');
  const [messageElem, messageHeader, textElem, messageFooter]: HTMLElement[] = createMessageParts();

  textElem.textContent = message.text;

  const timeElem: HTMLSpanElement = createElem('span', { class: 'main__dialogue_message-time' });
  timeElem.textContent = getFormatTime(message.datetime);
  const authorElem: HTMLSpanElement = createElem('span', {
    class: 'main__dialogue_message-author'
  });
  messageHeader.append(authorElem, timeElem);
  messageElem.append(messageHeader, textElem, messageFooter);

  if (message.from === interlocutorName.textContent) {
    messageElem.classList.add('interlocutor-message');
    authorElem.textContent = message.from;
  } else {
    messageElem.classList.add('own-message');
    authorElem.textContent = 'You';
    const statusElem: HTMLSpanElement = createElem('span', {
      class: 'main__dialogue_message-status'
    });

    statusElem.textContent = 'sent';
    messageFooter.append(statusElem);
    updateMessageStatus([messageElem], message.status);
  }

  dialogueContent.append(messageElem);
}

export function showMessageHistory(messages: ServerMsgSend[]): void {
  dialogueInput.disabled = false;
  dialogueSend.disabled = false;
  dialogueContent.replaceChildren('');

  if (messages.length) {
    dialogueContent.classList.remove('empty');
    messages.forEach((message: ServerMsgSend) => {
      drawMessage(message);
    });
  } else {
    dialogueContent.classList.add('empty');
    dialogueContent.append(chatHint);
    chatHint.textContent = 'Send the first message to the user';
  }
}
