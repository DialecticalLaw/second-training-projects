import { createElem } from '../../../../utils/create_elem';
import './garage_info.css';

export const garageInfo = createElem<HTMLDivElement>('div', { class: 'garage__info-block' });

const garageCarsCount = createElem<HTMLSpanElement>('span', { class: 'garage__cars-count' });
const garageTitle = createElem<HTMLParagraphElement>('p', { class: 'garage__info-title' });
garageTitle.textContent = 'Garage';
garageTitle.append(garageCarsCount);

const garagePage = createElem<HTMLParagraphElement>('p', { class: 'garage__page-number' });
garagePage.textContent = 'Page #';

const garageCarsBlock = createElem<HTMLDivElement>('div', { class: 'garage__cars-block' });

garageInfo.append(garageTitle, garagePage, garageCarsBlock);
