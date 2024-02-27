import { CallbackResponseArg } from '../../types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElem: HTMLDivElement | null = document.querySelector('.sources');
        const searchIcon: HTMLImageElement | null = document.querySelector('.search__icon');
        const resetIcon: HTMLImageElement | null = document.querySelector('.reset__icon');
        if (sourcesElem && searchIcon && resetIcon) {
            sourcesElem.addEventListener('click', (e: MouseEvent): void =>
                this.controller.getNews(e, (data: CallbackResponseArg): void => this.view.drawNews(data))
            );
            this.controller.getSources((data: CallbackResponseArg): void => this.view.drawSources(data));
            document.addEventListener('keydown', this.view.searchSources.bind(this.view));
            searchIcon.addEventListener('click', this.view.searchSources.bind(this.view));
            resetIcon.addEventListener('click', this.view.searchSources.bind(this.view));
        }
    }
}

export default App;
