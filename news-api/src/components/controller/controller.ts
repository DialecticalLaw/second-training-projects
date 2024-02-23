import AppLoader from './appLoader';
import { ResponseSources, CallbackResponse, ResponseNews } from '../../types/types';

class AppController extends AppLoader {
    getSources(callback: CallbackResponse<ResponseSources, ResponseNews>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: CallbackResponse<ResponseSources, ResponseNews>): void {
        let target = e.target as HTMLDivElement | HTMLSpanElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
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
