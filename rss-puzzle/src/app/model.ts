import LocalStorageService from './services/local_storage_service';
import AppView from './view/app_view';
import wordCollectionLevel1 from './data/wordCollection/wordCollectionLevel1.json';
import { Round } from '../interfaces';

export default class Model {
  private appView: AppView;

  constructor() {
    this.appView = new AppView();
  }

  public initiate(): void {
    AppView.drawBasicMarkup();
    if (!LocalStorageService.isLocalStorageInit()) {
      LocalStorageService.initLocalStorage();
      this.appView.displayComponent('loginPage');
    } else {
      this.appView.displayComponent('startPage');
    }
  }

  public static validate(): void {
    const nameInput = document.querySelector('.login-form__input_name') as HTMLInputElement;
    const surnameInput = document.querySelector('.login-form__input_surname') as HTMLInputElement;
    const hints = [...document.querySelectorAll('.login-form__hint')] as HTMLLIElement[];
    if (Model.isLoginValidCharUsage(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[0], 'validity', true);
    } else {
      AppView.switchComponentDisplay(hints[0], 'validity', false);
    }

    if (Model.isLoginFirstCharCapitalized(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[1], 'validity', true);
    } else {
      AppView.switchComponentDisplay(hints[1], 'validity', false);
    }

    if (Model.isLoginValidLength(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[2], 'validity', true);
    } else {
      AppView.switchComponentDisplay(hints[2], 'validity', false);
    }

    if (Model.isLoginNotEmpty(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[3], 'validity', true);
    } else {
      AppView.switchComponentDisplay(hints[3], 'validity', false);
    }

    const loginButton = document.querySelector('.login-form__button') as HTMLButtonElement;
    if (hints.every((hint: HTMLLIElement) => hint.classList.contains('valid'))) {
      AppView.switchComponentDisplay(loginButton, 'validity', true);
    } else {
      AppView.switchComponentDisplay(loginButton, 'validity', false);
    }
  }

  public tryLogin(event: MouseEvent): void {
    event.preventDefault();
    let isLoginInputsValid: boolean = true;
    const hints = [...document.querySelectorAll('.login-form__hint')] as HTMLLIElement[];
    hints.forEach((hint: HTMLLIElement) => {
      if (!hint.classList.contains('valid')) isLoginInputsValid = false;
    });
    if (isLoginInputsValid) {
      const nameInput: HTMLInputElement | null = document.querySelector('.login-form__input_name');
      const surnameInput: HTMLInputElement | null = document.querySelector(
        '.login-form__input_surname'
      );
      if (nameInput && surnameInput) {
        LocalStorageService.saveStringData('name', nameInput.value);
        LocalStorageService.saveStringData('surname', surnameInput.value);
        LocalStorageService.saveBooleanData('isLogin', true);
        const loginForm = document.querySelector('.login-form') as HTMLFormElement;
        const hintsWrapper = document.querySelector('.login-form__hints') as HTMLUListElement;
        const nameWrapper = document.querySelector('.login-form__name-wrapper') as HTMLDivElement;
        const surnameWrapper = document.querySelector(
          '.login-form__surname-wrapper'
        ) as HTMLDivElement;
        AppView.removeComponent([hintsWrapper, nameWrapper, surnameWrapper, loginForm]);
        this.appView.displayComponent('startPage');
      }
    }
  }

  private static isLoginValidLength(name: HTMLInputElement, surname: HTMLInputElement): boolean {
    return name.value.length >= 3 && surname.value.length >= 4;
  }

  private static isLoginValidCharUsage(name: HTMLInputElement, surname: HTMLInputElement): boolean {
    const validCharacters: RegExp = /^[a-zA-Z-]+$/;
    return validCharacters.test(name.value) && validCharacters.test(surname.value);
  }

  private static isLoginFirstCharCapitalized(
    name: HTMLInputElement,
    surname: HTMLInputElement
  ): boolean {
    if (name.value.length === 0 || surname.value.length === 0) return false;
    return (
      name.value[0] === name.value[0].toUpperCase() &&
      surname.value[0] === surname.value[0].toUpperCase()
    );
  }

  private static isLoginNotEmpty(name: HTMLInputElement, surname: HTMLInputElement): boolean {
    if (name.value.length === 0 || surname.value.length === 0) return false;
    return true;
  }

  public startMainPage(): void {
    const startContent = document.querySelector('.start-content') as HTMLDivElement;
    AppView.removeComponent([startContent]);
    this.appView.displayComponent('mainPage');
    this.startGame();
  }

  private startGame(): void {
    const round = wordCollectionLevel1.rounds[0];
    this.startRound(round);
  }

  private startRound(round: Round): void {
    const sentence = round.words[0].textExample.split(' ');
    this.appView.displayComponent('sourceWords', sentence);
  }

  public logout(): void {
    const title = document.querySelector('.title') as HTMLHeadingElement;
    const logoutButton = document.querySelector('.logout') as HTMLDivElement;
    const startContentWrapper: HTMLDivElement | null = document.querySelector('.start-content');
    if (startContentWrapper) AppView.removeComponent([startContentWrapper]);
    AppView.removeComponent([title, logoutButton]);
    LocalStorageService.clearUserData();
    this.appView.displayComponent('loginPage');
  }

  public static makeSourceReaction(event: MouseEvent): void {
    const eventTarget = event.target as HTMLDivElement | null;
    if (eventTarget) {
      AppView.moveComponent(eventTarget, 'moveSource');
    }
  }
}
