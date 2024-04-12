import { createElem } from '../../../utils/create-elem';
import './waiting-window.css';

export const waitingWindow: HTMLDivElement = createElem('div', { class: 'waiting-window' });
waitingWindow.textContent = 'Connecting to the server...';
const loadingGif: HTMLDivElement = createElem('div', { class: 'waiting-window__gif' });
waitingWindow.append(loadingGif);
