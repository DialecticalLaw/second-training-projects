import './start_page_style.css';
import { HandleAction, StartPageWrappers } from '../../../../interfaces';
import appendElem from '../../../utils/appendElem';
import createElem from '../../../utils/create_elem';
import { app } from '../../../../index';
import LocalStorageService from '../../../services/local_storage_service';
export default class StartPageView {
  private logoutBtn: HTMLDivElement;

  private startContentWrapper: HTMLDivElement;

  constructor() {
    const [logoutBtn, startContentWrapper]: StartPageWrappers =
      StartPageView.createStartPageWrappers();
    this.logoutBtn = logoutBtn;
    this.startContentWrapper = startContentWrapper;
  }

  public draw(): void {
    this.drawWrappers();
    StartPageView.drawTitle();
    this.drawLogout();
    this.drawStartContent();
    app.handleActionRequest(HandleAction.LoginEnd);
  }

  private drawWrappers(): void {
    const header = document.querySelector('.header') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;
    appendElem(header, [this.logoutBtn]);
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
    this.logoutBtn.textContent = 'Logout';
    appendElem(this.logoutBtn, [logoutIcon]);
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
    const startButton = createElem('button', { class: 'start-content__button' });
    startButton.textContent = 'Start';
    appendElem(this.startContentWrapper, [greeting, startDescription, startButton]);
  }

  private static createStartPageWrappers(): StartPageWrappers {
    const logoutBtn: HTMLDivElement = createElem<HTMLDivElement>('button', {
      class: 'logout'
    });
    const startContentWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'start-content'
    });
    return [logoutBtn, startContentWrapper];
  }
}
