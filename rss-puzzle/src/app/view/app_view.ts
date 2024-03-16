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
          options.puzzlesInfo &&
          options.sentenceIndex !== undefined &&
          options.imageSrc
        ) {
          this.mainPageView.drawSources(
            options.puzzlesInfo,
            options.imageSrc,
            options.sentenceIndex
          );
          MainPageView.drawSourcesPlaceInSentence(
            options.puzzlesInfo.length,
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
    options?: SwitchOptions
  ): void {
    switch (changeType) {
      case 'validity':
        AppView.switchValidity(elem, options);
        break;
      case 'continue-active':
        AppView.switchContinueActive(elem, options);
        break;
      case 'removeClass':
        if (options?.class) {
          elem.classList.remove(options?.class);
        }
        if (elem.classList.contains('playarea__source')) elem.removeAttribute('id');
        break;
      case 'addClass':
        if (options?.class) {
          elem.classList.add(options?.class);
        }
        break;
      case 'updateHint':
        if (elem.classList.contains('playarea__translate-text') && options?.hint) {
          MainPageView.updateTranslateText(options.hint);
        }
        break;
      default:
        break;
    }
  }

  private static switchValidity<T extends HTMLElement>(elem: T, options?: SwitchOptions): void {
    if (options?.isValid) {
      elem.classList.add('valid');
      elem.classList.remove('not-valid');
    } else if (options?.isValid === false) {
      elem.classList.remove('valid');
      elem.classList.add('not-valid');
    } else {
      elem.classList.remove('valid');
      elem.classList.remove('not-valid');
    }
  }

  private static switchContinueActive<T extends HTMLElement>(
    elem: T,
    options?: SwitchOptions
  ): void {
    if (options?.isValid) {
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

  public static moveComponent<T extends HTMLElement>(
    component: T,
    action: string,
    target?: T
  ): void {
    switch (action) {
      case 'moveSource':
        if (component instanceof HTMLDivElement) {
          MainPageView.moveSource(component);
        }
        break;
      case 'setSource':
        if (component instanceof HTMLDivElement && target) {
          MainPageView.setSource(target, component);
        }
        break;
      default:
        break;
    }
  }
}
