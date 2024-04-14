import './header.css';
import { createElem } from '../../../../utils/create-elem';

export const header: HTMLElement = createElem('header', { class: 'header' });

const usernameText: HTMLParagraphElement = createElem('p', { class: 'header__user-name' });
export const username: HTMLSpanElement = createElem('span', { class: 'header__user-name_value' });
usernameText.append('User: ', username);

const appName: HTMLParagraphElement = createElem('p', { class: 'header__app-name' });
appName.textContent = 'Fun chat';

export const logoutBtn: HTMLButtonElement = createElem('button', { class: 'header__logout' });
logoutBtn.textContent = 'Logout';

header.append(usernameText, appName, logoutBtn);
