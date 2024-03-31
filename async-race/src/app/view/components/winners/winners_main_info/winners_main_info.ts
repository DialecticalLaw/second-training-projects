import { createElem } from '../../../../utils/create_elem';
import './winners_main_info.css';

export const winnersInfo = createElem<HTMLDivElement>('div', { class: 'winners__info_block' });

const winnersTitleInfo = createElem<HTMLParagraphElement>('p', { class: 'winners__info_title' });
export const winnersCount = createElem<HTMLSpanElement>('span', {
  class: 'winners__info_count'
});
winnersTitleInfo.insertAdjacentText('beforeend', 'Winners (');
winnersTitleInfo.insertAdjacentElement('beforeend', winnersCount);
winnersTitleInfo.insertAdjacentText('beforeend', ')');

const winnersPageInfo = createElem<HTMLParagraphElement>('p', { class: 'winners__info_page' });
export const winnersPageNumber = createElem<HTMLSpanElement>('span', {
  class: 'winners__info_page-number'
});
winnersPageInfo.insertAdjacentText('beforeend', 'Page #');
winnersPageInfo.insertAdjacentElement('beforeend', winnersPageNumber);

winnersInfo.append(winnersTitleInfo, winnersPageInfo);
