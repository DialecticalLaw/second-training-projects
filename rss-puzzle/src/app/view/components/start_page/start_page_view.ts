import './start_page_style.css';
import { StartPageWrappers } from '../../../../interfaces';
import appendElem from '../../../utils/appendElem';
import createElem from '../../../utils/create_elem';
import { app } from '../../../../index';
export default class StartPageView {
  private logoutWrapper: HTMLDivElement;

  constructor() {
    const [logoutWrapper]: StartPageWrappers = StartPageView.createStartPageWrappers();
    this.logoutWrapper = logoutWrapper;
  }

  public draw(): void {
    this.drawLogout();
    app.handleActionRequest('login');
  }

  private drawLogout(): void {
    const header = document.querySelector('.header') as HTMLElement;
    appendElem(header, [this.logoutWrapper]);
    const logoutIcon = createElem<HTMLImageElement>('img', {
      class: 'logout__icon',
      src: 'assets/img/logout.svg'
    });
    this.logoutWrapper.textContent = 'Logout';
    appendElem(this.logoutWrapper, [logoutIcon]);
  }

  private static createStartPageWrappers(): StartPageWrappers {
    const logoutWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'logout'
    });
    return [logoutWrapper];
  }
}
