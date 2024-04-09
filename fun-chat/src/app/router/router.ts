import { Page } from '../../interfaces';

export class Router {
  public static moveToPage(page: Page) {
    let pageName: string;
    switch (page) {
      case Page.Login:
        pageName = '/login';
        break;
      case Page.Main:
        pageName = '/main';
        break;
      case Page.Info:
        pageName = '/info';
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
      break;
    case Page.Main:
      break;
    case Page.Info:
      break;
    default:
      break;
  }
});
