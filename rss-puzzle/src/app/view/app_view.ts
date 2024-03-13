import LoginPageView from './components/login_page/login_page_view';
import StartPageView from './components/start_page/start_page_view';
import createElem from '../utils/create_elem';
import appendElem from '../utils/appendElem';
import MainPageView from './components/main_page/main_page_view';
import { DisplayOptions, SwitchOptions } from '../../interfaces';
import { app } from '../..';

export default class AppView {
  private loginPageView: LoginPageView;

  private startPageView: StartPageView;

  private mainPageView: MainPageView;

  constructor() {
    this.loginPageView = new LoginPageView();
    this.startPageView = new StartPageView();
    this.mainPageView = new MainPageView();
  }

  public displayComponent(componentName: string, options?: DisplayOptions): void {
    switch (componentName) {
      case 'loginPage':
        this.loginPageView.draw();
        break;
      case 'startPage':
        this.startPageView.draw();
        break;
      case 'mainPage':
        this.mainPageView.draw();
        break;
      case 'sourceWords':
        if (
          options !== undefined &&
          options.componentsText &&
          options.sentenceIndex !== undefined
        ) {
          this.mainPageView.drawSources(options.componentsText);
          MainPageView.drawSourcesPlaceInSentence(
            options.componentsText.length,
            options.sentenceIndex
          );
        }
        break;
      default:
        break;
    }
  }

  public static removeComponent<T extends HTMLElement>(components: T[]): void {
    components.forEach((component: T) => {
      component.replaceChildren(); // === remove all children
      component.remove();
    });
  }

  public static switchComponentDisplay<T extends HTMLElement>(
    elem: T,
    changeType: string,
    options: SwitchOptions
  ): void {
    switch (changeType) {
      case 'validity':
        if (options.isValid) {
          elem.classList.add('valid');
          elem.classList.remove('not-valid');
        } else {
          elem.classList.remove('valid');
          elem.classList.add('not-valid');
        }
        break;
      case 'continue-active':
        if (options.isValid) {
          const elemLink: T = elem;
          elem.classList.add('continue');
          app.handleActionRequest('continue');
          elem.classList.remove('valid');
          elemLink.textContent = 'Continue';
        } else {
          const elemLink: T = elem;
          app.handleActionRequest('check');
          elem.classList.remove('continue');
          elem.classList.remove('valid');
          elemLink.textContent = 'Check';
        }
        break;
      case 'disable':
        if (options.class) {
          elem.classList.remove(options.class);
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

  public static moveComponent<T extends HTMLElement>(component: T, action: string): void {
    switch (action) {
      case 'moveSource':
        if (component instanceof HTMLDivElement) {
          MainPageView.moveSourceOnClick(component);
        }
        break;
      default:
        break;
    }
  }
}
