import { createElem } from '../../../../utils/create_elem';
import './garage_info.css';

export const garageInfo = createElem<HTMLDivElement>('div', { class: 'garage__info-block' });

const garageTitle = createElem<HTMLParagraphElement>('p', { class: 'garage__info-title' });
garageTitle.innerHTML = 'Garage (<span class="garage__cars-count"></span>)';

const garagePage = createElem<HTMLParagraphElement>('p', { class: 'garage__page' });
garagePage.innerHTML = 'Page #<span class="garage__page_number"></span>';

const garageCarsBlock = createElem<HTMLDivElement>('div', { class: 'garage__cars-block' });

garageInfo.append(garageTitle, garagePage, garageCarsBlock);
