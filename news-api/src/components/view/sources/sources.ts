import './sources.css';
import { Source } from '../../../types/types';

class Sources {
    draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();

        data.forEach((item: Source): void => {
            const sourceItem: HTMLDivElement = document.createElement('div');
            sourceItem.classList.add('source__item');

            const sourceItemName: HTMLSpanElement = document.createElement('span');
            sourceItemName.classList.add('source__item-name');
            sourceItem.insertAdjacentElement('beforeend', sourceItemName);

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceItem);
        });

        const sourcesElem = document.querySelector('.sources') as HTMLDivElement;
        sourcesElem.append(fragment);
    }
}

export default Sources;
