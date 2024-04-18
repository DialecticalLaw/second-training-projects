import './main.css';
import { createElem } from '../../../../utils/create-elem';

export const main: HTMLElement = createElem('main', { class: 'main' });

const userList: HTMLDivElement = createElem('div', { class: 'main__user-list' });

export const searchInput: HTMLInputElement = createElem('input', {
  class: 'main__search-user',
  type: 'text',
  placeholder: 'Search...'
});
export const mainUsers: HTMLUListElement = createElem('ul', { class: 'main__users' });
userList.append(searchInput, mainUsers);

const interlocutorDialogue: HTMLDivElement = createElem('div', { class: 'main__dialogue' });

const interlocutorInfo: HTMLDivElement = createElem('div', { class: 'main__interlocutor_info' });
export const interlocutorName: HTMLParagraphElement = createElem('p', {
  class: 'main__interlocutor_name'
});
export const interlocutorStatus: HTMLParagraphElement = createElem('p', {
  class: 'main__interlocutor_status'
});
interlocutorInfo.append(interlocutorName, interlocutorStatus);

export const dialogueContent: HTMLDivElement = createElem('div', {
  class: 'main__dialogue_content empty'
});
export const chatHint: HTMLParagraphElement = createElem('p', { class: 'main__dialogue_hint' });
chatHint.textContent = 'Select a person to talk with';
dialogueContent.append(chatHint);

const dialogueTools: HTMLFormElement = createElem('form', { class: 'main__dialogue_tools' });
export const dialogueInput: HTMLInputElement = createElem('input', {
  class: 'main__dialogue_input',
  type: 'text',
  placeholder: 'Your message...',
  disabled: 'true'
});
export const dialogueSend: HTMLButtonElement = createElem('button', {
  class: 'main__dialogue_send',
  disabled: 'true'
});
dialogueSend.textContent = 'Send';
dialogueTools.append(dialogueInput, dialogueSend);

interlocutorDialogue.append(interlocutorInfo, dialogueContent, dialogueTools);

main.append(userList, interlocutorDialogue);
