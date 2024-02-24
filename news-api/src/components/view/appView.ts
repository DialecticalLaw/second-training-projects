import News from './news/news';
import Sources from './sources/sources';
import { Article, ResponseNews, Source } from '../../types/types';
import { ResponseSources } from '../../types/types';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ResponseNews | ResponseSources): void {
        if ('totalResults' in data) {
            const values: Article[] = data?.articles ? data?.articles : [];
            this.news.draw(values);
        }
    }

    public drawSources(data: ResponseSources | ResponseNews): void {
        if ('sources' in data) {
            const values: Source[] = data?.sources ? data?.sources : [];
            this.sources.draw(values);
        }
    }
}

export default AppView;
