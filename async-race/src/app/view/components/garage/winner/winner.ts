import './winner.css';
import { createElem } from '../../../../utils/create_elem';

export const winnerWrapper = createElem<HTMLDivElement>('div', { class: 'winner' });

export const winnerDescription = createElem<HTMLParagraphElement>('p', {
  class: 'winner__description'
});
winnerWrapper.append(winnerDescription);
