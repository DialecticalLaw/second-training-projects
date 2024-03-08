import './start_page_style.css';
import { StartPageWrappers } from '../../../../interfaces';
import appendElem from '../../../utils/appendElem';
import createElem from '../../../utils/create_elem';
import { app } from '../../../../index';
import LocalStorageService from '../../../services/local_storage_service';
export default class StartPageView {
  private logoutWrapper: HTMLDivElement;

  private startContentWrapper: HTMLDivElement;

  constructor() {
    const [logoutWrapper, startContentWrapper]: StartPageWrappers =
      StartPageView.createStartPageWrappers();
    this.logoutWrapper = logoutWrapper;
    this.startContentWrapper = startContentWrapper;
  }

  public draw(): void {
    this.drawWrappers();
    StartPageView.drawTitle();
    this.drawLogout();
    app.handleActionRequest('login');
    this.drawStartContent();
  }

  private drawWrappers(): void {
    const header = document.querySelector('.header') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;
    appendElem(header, [this.logoutWrapper]);
    appendElem(main, [this.startContentWrapper]);
  }

  private static drawTitle() {
    const header: HTMLElement | null = document.querySelector('.header');
    const title = createElem('h1', { class: 'title' });
    title.textContent = 'RSS Puzzle';
    if (header) appendElem(header, [title]);
  }

  private drawLogout(): void {
    const logoutIcon = createElem<HTMLImageElement>('img', {
      class: 'logout__icon',
      src: 'assets/img/logout.svg'
    });
    this.logoutWrapper.textContent = 'Logout';
    appendElem(this.logoutWrapper, [logoutIcon]);
  }

  private drawStartContent(): void {
    const greeting: HTMLParagraphElement = createElem<HTMLParagraphElement>('p', {
      class: 'start-content__greeting'
    });
    const userName = LocalStorageService.getData('name');
    const userSurname = LocalStorageService.getData('surname');
    greeting.innerHTML = `Hello, <span>${userName} ${userSurname}</span>! Get ready to learn something new!`;
    const startDescription: HTMLParagraphElement = createElem<HTMLParagraphElement>('p', {
      class: 'start-content__description'
    });
    startDescription.textContent =
      'This is an interactive game that can help you improve your English skills. With this game, you can complete puzzles of words and sentences, which will help you expand your vocabulary and improve your grammar. By completing all the levels, you will become a true master of the English language.';
    appendElem(this.startContentWrapper, [greeting, startDescription]);
  }

  private static createStartPageWrappers(): StartPageWrappers {
    const logoutWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'logout'
    });
    const startContentWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'start-content'
    });
    return [logoutWrapper, startContentWrapper];
  }
}
