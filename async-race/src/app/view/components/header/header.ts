import { createElem } from '../../../utils/create_elem';
import './header.css';

export const header = createElem<HTMLElement>('header', { class: 'header' });
const switchPages = <HTMLFormElement>createElem('form', { class: 'switch-pages' });

export const selectGarageBtn = <HTMLButtonElement>(
  createElem('button', { class: 'switch-pages__btn_garage disabled' })
);
selectGarageBtn.innerHTML = '<span>TO GARAGE</span>';

export const selectWinnersBtn = <HTMLButtonElement>(
  createElem('button', { class: 'switch-pages__btn_winners' })
);
selectWinnersBtn.innerHTML = '<span>TO WINNERS</span>';

switchPages.append(selectGarageBtn, selectWinnersBtn);
header.append(switchPages);
