import News from './news/news';
import Sources from './sources/sources';
import { Article, Source, CallbackResponseArg } from '../../types/types';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: CallbackResponseArg): void {
        if ('totalResults' in data) {
            const values: Article[] = data?.articles ? data?.articles : [];
            this.news.draw(values);
        }
    }

    public drawSources(data: CallbackResponseArg): void {
        if ('sources' in data) {
            const values: Source[] = data?.sources ? data?.sources : [];
            this.sources.draw(values);
        }
    }

    private isSourceMatch(source: string, template: string): boolean {
        for (let i: number = 0; i < template.length; i++) {
            if (source[i] !== template[i]) {
                return false;
            }
        }
        return true;
    }

    public searchSources(event: KeyboardEvent | MouseEvent): void {
        if (event instanceof KeyboardEvent && event.key !== 'Enter') return;
        event.preventDefault();

        const searchInput: HTMLInputElement | null = document.querySelector('.search__input');
        const sourceItems: Element[] = [...document.querySelectorAll('.source__item')];
        const sourceItemsNames: Element[] = [...document.querySelectorAll('.source__item-name')];
        const eventTarget = event.target as HTMLImageElement;

        if (searchInput && sourceItemsNames.length && eventTarget) {
            if (searchInput.value === '' || eventTarget.classList.contains('reset__icon')) {
                for (const source of sourceItems) {
                    source.classList.remove('source__item-disabled');
                }
                return;
            }

            const filteredSources: Element[] = sourceItemsNames.filter((item: Element): boolean => {
                if (item.textContent) {
                    const itemText: string = item.textContent;
                    return this.isSourceMatch(itemText.toLowerCase().trim(), searchInput.value.toLowerCase().trim());
                }
                return false;
            });

            const values: Readonly<string[]> = filteredSources.map((item: Element): string => item.textContent || '');
            this.sources.drawFoundSources(values);
        } else {
            return;
        }
    }
}

export default AppView;
