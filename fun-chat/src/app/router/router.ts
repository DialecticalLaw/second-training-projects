import { Page } from '../../interfaces';
import { hideCurrentView } from '../view/app-view';
import { drawInfoPage } from '../view/info-view/info-view';
import { drawLogin } from '../view/login-view/login-view';
import { drawMainPage } from '../view/main-view/main-view';

export class Router {
  public static moveToPage(page: Page) {
    let pageName: string = '';
    hideCurrentView();
    switch (page) {
      case Page.Login:
        // pageName = '/login';
        drawLogin();
        break;
      case Page.Main:
        drawMainPage();
        // pageName = '/main';
        break;
      case Page.Info:
        drawInfoPage();
        // pageName = '/info';
        break;
      default:
        pageName = '404';
    }
    window.history.pushState({ page }, '', pageName);
  }
}

window.addEventListener('popstate', (event: PopStateEvent) => {
  switch (event.state) {
    case Page.Login:
      drawLogin();
      break;
    case Page.Main:
      break;
    case Page.Info:
      break;
    default:
      break;
  }
});
