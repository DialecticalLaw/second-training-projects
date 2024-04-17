import { Page } from '../../interfaces';
import { hideCurrentView } from '../view/app-view';
import { drawInfoPage } from '../view/info-view/info-view';
import { drawLogin } from '../view/login-view/login-view';
import { drawMainPage } from '../view/main-view/main-view';

export class Router {
  public static moveToPage(page: Page) {
    let pageName: string = '';
    let draw: () => void;
    hideCurrentView();
    switch (page) {
      case Page.Login:
        // pageName = '/login';
        draw = drawLogin;
        break;
      case Page.Main:
        draw = drawMainPage;
        // pageName = '/main';
        break;
      case Page.Info:
        draw = drawInfoPage;
        // pageName = '/info';
        break;
      default:
        draw = drawLogin; // TODO: replace draw Login with 404 rendering
        pageName = '404';
    }

    draw();
    window.history.pushState({ page }, '', pageName);
  }
}

window.addEventListener('popstate', (event: PopStateEvent) => {
  let draw: () => void;
  hideCurrentView();
  switch (event.state.page) {
    case Page.Login:
      draw = drawLogin;
      break;
    case Page.Main:
      draw = drawMainPage;
      break;
    case Page.Info:
      draw = drawInfoPage;
      break;
    default:
      draw = drawLogin; // TODO: replace draw Login with 404 rendering
      break;
  }
  draw();
});
