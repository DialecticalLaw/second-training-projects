import './winner.css';
import { createElem } from '../../../../utils/create_elem';

export const winnerWrapper = createElem<HTMLDivElement>('div', { class: 'winner' });

export const winnerDescription = createElem<HTMLParagraphElement>('p', {
  class: 'winner__description'
});

const winnerNote = createElem<HTMLParagraphElement>('p', { class: 'winner__note' });
winnerNote.textContent = 'Press "RESET" button';
winnerWrapper.append(winnerDescription, winnerNote);
