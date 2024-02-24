import AppLoader from './appLoader';
import { ResponseSources, CallbackResponse, ResponseNews, EndpointKind } from '../../types/types';

class AppController extends AppLoader {
    public getSources(callback: CallbackResponse<ResponseSources, ResponseNews>): void {
        super.getResp(
            {
                endpoint: EndpointKind.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: CallbackResponse<ResponseSources, ResponseNews>): void {
        let target = e.target as HTMLDivElement | HTMLSpanElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
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
