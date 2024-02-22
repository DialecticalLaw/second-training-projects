import News from './news/news';
import Sources from './sources/sources';
import { Article, ResponseNews, Source } from '../../types/types';
import { ResponseSources } from '../../types/types';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ResponseNews) {
        const values: Article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResponseSources) {
        const values: Source[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
