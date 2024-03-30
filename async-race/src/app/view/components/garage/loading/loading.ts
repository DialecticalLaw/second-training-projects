import './loading.css';
import { createElem } from '../../../../utils/create_elem';

export const loadingWrapper = createElem<HTMLDivElement>('div', { class: 'loading' });

const loadingGif = createElem<HTMLDivElement>('div', { class: 'loading__gif' });

const loadingText = createElem<HTMLParagraphElement>('p', { class: 'loading__text' });
loadingText.textContent = 'Loading...';

loadingWrapper.append(loadingGif, loadingText);
