import './garage_switch_block.css';
import { createElem } from '../../../../utils/create_elem';

export const garagePageSwitchBlock = createElem<HTMLFormElement>('form', {
  class: 'garage__page-switch-block'
});
export const prevBtn = createElem<HTMLButtonElement>('button', { class: 'garage__btn_prev' });
prevBtn.innerHTML = '<span>PREV</span>';
export const nextBtn = createElem<HTMLButtonElement>('button', { class: 'garage__btn_next' });
nextBtn.innerHTML = '<span>NEXT</span>';
garagePageSwitchBlock.append(prevBtn, nextBtn);
