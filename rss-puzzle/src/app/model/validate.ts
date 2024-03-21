import { ChangeType } from '../../interfaces';
import AppView from '../view/app_view';

export default class Validate {
  public static validate(): void {
    const nameInput = document.querySelector('.login-form__input_name') as HTMLInputElement;
    const surnameInput = document.querySelector('.login-form__input_surname') as HTMLInputElement;
    const hints = [...document.querySelectorAll('.login-form__hint')] as HTMLLIElement[];

    if (Validate.isLoginValidCharUsage(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[0], ChangeType.Validity, { isValid: true });
    } else {
      AppView.switchComponentDisplay(hints[0], ChangeType.Validity, { isValid: false });
    }

    if (Validate.isLoginFirstCharCapitalized(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[1], ChangeType.Validity, { isValid: true });
    } else {
      AppView.switchComponentDisplay(hints[1], ChangeType.Validity, { isValid: false });
    }

    if (Validate.isLoginValidLength(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[2], ChangeType.Validity, { isValid: true });
    } else {
      AppView.switchComponentDisplay(hints[2], ChangeType.Validity, { isValid: false });
    }

    if (Validate.isLoginNotEmpty(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[3], ChangeType.Validity, { isValid: true });
    } else {
      AppView.switchComponentDisplay(hints[3], ChangeType.Validity, { isValid: false });
    }

    const loginButton = document.querySelector('.login-form__button') as HTMLButtonElement;
    if (hints.every((hint: HTMLLIElement): boolean => hint.classList.contains('valid'))) {
      AppView.switchComponentDisplay(loginButton, ChangeType.Validity, { isValid: true });
    } else {
      AppView.switchComponentDisplay(loginButton, ChangeType.Validity, { isValid: false });
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
}
