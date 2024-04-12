import { createElem } from '../../../utils/create-elem';
import './info-page.css';

export const infoPage: HTMLDivElement = createElem('div', { class: 'info' });

const infoTitle: HTMLParagraphElement = createElem('p', { class: 'info__title' });
infoTitle.textContent = 'Fun chat';

const infoText: HTMLParagraphElement = createElem('p', { class: 'info__content' });
infoText.textContent =
  'The application was developed as a training project to consolidate skills in working with the WebSocket protocol';

const infoAuthor: HTMLAnchorElement = createElem('a', {
  class: 'info__author',
  href: 'https://github.com/DialecticalLaw',
  target: '_blank'
});
infoAuthor.textContent = 'Author: DialecticalLaw';

export const backBtn: HTMLButtonElement = createElem('button', { class: 'info__back-btn' });
backBtn.textContent = 'Back';

infoPage.append(infoTitle, infoText, infoAuthor, backBtn);
