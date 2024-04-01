import './winners_switch_block.css';
import { createElem } from '../../../../utils/create_elem';

export const winnersPageSwitchBlock = createElem<HTMLFormElement>('form', {
  class: 'winners__page-switch-block'
});
export const prevWinnersBtn = createElem<HTMLButtonElement>('button', {
  class: 'winners__btn_prev'
});
prevWinnersBtn.innerHTML = '<span>PREV</span>';
export const nextWinnersBtn = createElem<HTMLButtonElement>('button', {
  class: 'winners__btn_next'
});
nextWinnersBtn.innerHTML = '<span>NEXT</span>';
winnersPageSwitchBlock.append(prevWinnersBtn, nextWinnersBtn);
