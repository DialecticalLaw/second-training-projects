import AppView from './view/app_view';

export default class Model {
  public static initiate(): void {
    AppView.drawBasicMarkup();
    AppView.displayComponent('loginPage');
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

  public static tryLogin(event: MouseEvent): void {
    event.preventDefault();
    let isLoginInputsValid: boolean = true;
    const hints = [...document.querySelectorAll('.login-form__hint')] as HTMLLIElement[];
    hints.forEach((hint: HTMLLIElement) => {
      if (!hint.classList.contains('valid')) isLoginInputsValid = false;
    });
    if (isLoginInputsValid) AppView.displayComponent('startScreen');
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
}
