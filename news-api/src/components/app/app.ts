import { ResponseNews, ResponseSources } from '../../types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElem: HTMLDivElement | null = document.querySelector('.sources');
        if (sourcesElem !== null) {
            sourcesElem.addEventListener('click', (e: MouseEvent) =>
                this.controller.getNews(e, (data: ResponseNews | ResponseSources): void => this.view.drawNews(data))
            );
            this.controller.getSources((data: ResponseSources | ResponseNews) => this.view.drawSources(data));
        }
    }
}

export default App;
