import './news.css';
import { Article } from '../../../types/types';

class News {
    draw(data: Article[]): void {
        const news: Article[] =
            data.length >= 10 ? data.filter((_item: Article, idx: number): boolean => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();

        news.forEach((item: Article, idx: number) => {
            const newsItem: HTMLDivElement = document.createElement('div');
            newsItem.classList.add('news__item');

            const newsMeta: HTMLDivElement = document.createElement('div');
            newsMeta.classList.add('news__meta');
            newsItem.insertAdjacentElement('beforeend', newsMeta);

            const newsMetaPhoto: HTMLDivElement = document.createElement('div');
            newsMetaPhoto.classList.add('news__meta-photo');
            newsMeta.insertAdjacentElement('beforeend', newsMetaPhoto);

            const newsMetaDetails: HTMLUListElement = document.createElement('ul');
            newsMetaDetails.classList.add('news__meta-details');
            newsMeta.insertAdjacentElement('beforeend', newsMetaDetails);

            const newsMetaAuthor: HTMLLIElement = document.createElement('li');
            newsMetaAuthor.classList.add('news__meta-author');
            const newsMetaDate: HTMLLIElement = document.createElement('li');
            newsMetaDate.classList.add('news__meta-date');
            newsMetaDetails.insertAdjacentElement('beforeend', newsMetaAuthor);
            newsMetaDetails.insertAdjacentElement('beforeend', newsMetaDate);

            const newsDescription: HTMLDivElement = document.createElement('div');
            newsDescription.classList.add('news__description');
            newsItem.insertAdjacentElement('beforeend', newsDescription);

            const newsDescTitle: HTMLHeadingElement = document.createElement('h2');
            newsDescTitle.classList.add('news__description-title');
            const newsDescSource: HTMLHeadingElement = document.createElement('h3');
            newsDescSource.classList.add('news__description-source');
            const newsDescContent: HTMLParagraphElement = document.createElement('p');
            newsDescContent.classList.add('news__description-content');
            newsDescription.insertAdjacentElement('beforeend', newsDescTitle);
            newsDescription.insertAdjacentElement('beforeend', newsDescSource);
            newsDescription.insertAdjacentElement('beforeend', newsDescContent);

            const newsReadMore: HTMLParagraphElement = document.createElement('p');
            newsReadMore.classList.add('news__read-more');
            newsDescription.insertAdjacentElement('beforeend', newsReadMore);
            const readMoreLink: HTMLAnchorElement = document.createElement('a');
            readMoreLink.href = '#';
            readMoreLink.textContent = 'Read More';
            newsReadMore.insertAdjacentElement('beforeend', readMoreLink);

            if (idx % 2) newsItem.classList.add('alt');

            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            newsMetaAuthor.textContent = item.author || item.source.name;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            newsDescTitle.textContent = item.title;
            newsDescSource.textContent = item.source.name;
            newsDescContent.textContent = item.description;
            readMoreLink.setAttribute('href', item.url);

            fragment.append(newsItem);
        });

        const newsElem = document.querySelector('.news') as HTMLDivElement;
        newsElem.innerHTML = '';
        newsElem.appendChild(fragment);
    }
}

export default News;
