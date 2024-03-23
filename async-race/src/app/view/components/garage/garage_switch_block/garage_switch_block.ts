import './garage_switch_block.css';
import { createElem } from '../../../../utils/create_elem';

export const garagePageSwitchBlock = createElem<HTMLFormElement>('form', {
  class: 'garage__page-switch-block'
});
const prevBtn = createElem<HTMLButtonElement>('button', { class: 'garage__btn_prev' });
prevBtn.textContent = 'PREV';
const nextBtn = createElem<HTMLButtonElement>('button', { class: 'garage__btn_next' });
nextBtn.textContent = 'NEXT';
garagePageSwitchBlock.append(prevBtn, nextBtn);
