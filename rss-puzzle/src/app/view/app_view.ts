import LoginPageView from './components/login_page/login_page_view';
import createElem from '../utils/create_elem';
import appendElem from '../utils/appendElem';

export default class AppView {
  loginPageView: LoginPageView;

  constructor() {
    this.loginPageView = new LoginPageView();
  }

  public displayComponent(component: string): void {
    switch (component) {
      case 'loginPage':
        this.loginPageView.draw();
        break;
      case 'startScreen':
        break;
      default:
        break;
    }
  }

  public static switchComponentDisplay<T extends HTMLElement>(
    elem: T,
    changeType: string,
    isValid?: boolean
  ): void {
    switch (changeType) {
      case 'validity':
        if (isValid) {
          elem.classList.add('valid');
        } else {
          elem.classList.remove('valid');
        }
        break;
      default:
        break;
    }
  }

  public static drawBasicMarkup(): void {
    const container: HTMLDivElement = createElem<HTMLDivElement>('div', { class: 'container' });
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (body) {
      appendElem(body, [container]);
    }
    const header: HTMLElement = createElem<HTMLElement>('header', { class: 'header' });
    const main: HTMLElement = createElem<HTMLElement>('main', { class: 'main' });
    const footer: HTMLElement = createElem<HTMLElement>('footer', { class: 'footer' });
    appendElem(container, [header, main, footer]);
  }
}
