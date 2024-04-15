import { createElem } from '../../../utils/create-elem';
import './container.css';

export const container: HTMLDivElement = createElem('div', { class: 'container' });
export const infoBtn: HTMLButtonElement = createElem('button', { class: 'info-btn button-hover' });
infoBtn.textContent = 'Info';
container.append(infoBtn);
