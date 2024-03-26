import { createElem } from '../../../../utils/create_elem';
import './garage_info.css';

export const garageInfo = createElem<HTMLDivElement>('div', { class: 'garage__info-block' });

const garageTitle = createElem<HTMLParagraphElement>('p', { class: 'garage__info-title' });
export const carsCountElem = createElem<HTMLSpanElement>('span', { class: 'garage__cars-count' });
garageTitle.insertAdjacentText('beforeend', 'Garage (');
garageTitle.insertAdjacentElement('beforeend', carsCountElem);
garageTitle.insertAdjacentText('beforeend', ')');

const garagePage = createElem<HTMLParagraphElement>('p', { class: 'garage__page' });
export const pageNumberElem = createElem<HTMLSpanElement>('span', { class: 'garage__page_number' });
garagePage.insertAdjacentText('beforeend', 'Page #');
garagePage.insertAdjacentElement('beforeend', pageNumberElem);

export const garageCarsBlock = createElem<HTMLDivElement>('div', { class: 'garage__cars-block' });

garageInfo.append(garageTitle, garagePage, garageCarsBlock);
