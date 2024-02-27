import AppLoader from './appLoader';
import { CallbackResponse, EndpointKind } from '../../types/types';

class AppController extends AppLoader {
    public getSources(callback: CallbackResponse): void {
        super.getResp(
            {
                endpoint: EndpointKind.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: CallbackResponse): void {
        let target = e.target as HTMLDivElement | HTMLSpanElement;
        const newsContainer = e.currentTarget as HTMLDivElement;
        const newsItems: Element[] = [...document.querySelectorAll('.source__item')];
        for (const item of newsItems) {
            item.classList.remove('source__item-current');
        }

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                target.classList.add('source__item-current');
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: EndpointKind.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement as HTMLDivElement;
        }
    }
}

export default AppController;
