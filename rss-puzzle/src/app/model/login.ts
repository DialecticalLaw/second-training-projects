import { app } from '../..';
import { ComponentName } from '../../interfaces';
import LocalStorageService from '../services/local_storage_service';
import AppView from '../view/app_view';
import Model from './model';

export default class Login extends Model {
  constructor() {
    super();
  }

  public tryLogin(event: MouseEvent) {
    event.preventDefault();
    const localStorageService: LocalStorageService = new LocalStorageService();
    let isLoginInputsValid: boolean = true;
    const hints = [...document.querySelectorAll('.login-form__hint')] as HTMLLIElement[];

    hints.forEach((hint: HTMLLIElement): void => {
      if (!hint.classList.contains('valid')) isLoginInputsValid = false;
    });

    if (isLoginInputsValid) {
      const nameInput: HTMLInputElement | null = document.querySelector('.login-form__input_name');
      const surnameInput: HTMLInputElement | null = document.querySelector(
        '.login-form__input_surname'
      );

      if (nameInput && surnameInput) {
        localStorageService.saveStringData('name', nameInput.value);
        localStorageService.saveStringData('surname', surnameInput.value);
        localStorageService.saveBooleanData('isLogin', true);

        const loginForm = document.querySelector('.login-form') as HTMLFormElement;
        const hintsWrapper = document.querySelector('.login-form__hints') as HTMLUListElement;
        const nameWrapper = document.querySelector('.login-form__name-wrapper') as HTMLDivElement;
        const surnameWrapper = document.querySelector(
          '.login-form__surname-wrapper'
        ) as HTMLDivElement;

        AppView.removeComponent([hintsWrapper, nameWrapper, surnameWrapper, loginForm]);
        this.appView.displayComponent(ComponentName.StartPage);
      }
    }
  }

  public logout(): void {
    app.model.roundIndex = undefined;
    app.model.sentenceIndex = undefined;

    const title = document.querySelector('.title') as HTMLHeadingElement;
    const logoutButton = document.querySelector('.logout') as HTMLDivElement;
    const startContentWrapper: HTMLDivElement | null = document.querySelector('.start-content');
    if (startContentWrapper) {
      AppView.removeComponent([startContentWrapper]);
    } else {
      Login.logoutFromMainPage();
    }

    AppView.removeComponent([title, logoutButton]);
    this.localStorageService.clearUserData();
    this.appView.displayComponent(ComponentName.LoginPage);
  }

  private static logoutFromMainPage(): void {
    const playarea: HTMLDivElement | null = document.querySelector('.playarea');
    const playareaOptions: HTMLDivElement | null = document.querySelector('.playarea__options');
    const playareaOptionsHints: HTMLDivElement | null = document.querySelector(
      '.playarea__options_hints'
    );
    const playareaOptionsSelect: HTMLDivElement | null = document.querySelector(
      '.playarea__options_select'
    );
    const playareaHints: HTMLDivElement | null = document.querySelector('.playarea__hints-wrapper');
    const playareaPuzzles: HTMLDivElement | null = document.querySelector('.playarea__puzzles');
    const playareaSources: HTMLDivElement | null = document.querySelector('.playarea__sources');
    const playareaButtons: HTMLDivElement | null = document.querySelector('.playarea__buttons');

    if (
      playarea &&
      playareaOptions &&
      playareaHints &&
      playareaOptionsHints &&
      playareaOptionsSelect &&
      playareaPuzzles &&
      playareaSources &&
      playareaButtons
    ) {
      AppView.removeComponent([
        playarea,
        playareaOptions,
        playareaHints,
        playareaOptionsHints,
        playareaOptionsSelect,
        playareaPuzzles,
        playareaSources,
        playareaButtons
      ]);
    }
  }
}
