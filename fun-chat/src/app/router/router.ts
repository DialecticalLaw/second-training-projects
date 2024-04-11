import { Page } from '../../interfaces';
import { hideCurrentView } from '../view/app-view';
import { drawLogin } from '../view/login-view/login-view';

export class Router {
  public static moveToPage(page: Page) {
    let pageName: string = '';
    switch (page) {
      case Page.Login:
        // pageName = '/login';
        hideCurrentView();
        drawLogin();
        break;
      case Page.Main:
        hideCurrentView();
        // pageName = '/main';
        break;
      case Page.Info:
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
