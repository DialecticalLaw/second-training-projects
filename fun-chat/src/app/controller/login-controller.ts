import { Page } from '../../interfaces';
import { Router } from '../router/router';
import { updateElemValidity } from '../view/app-view';
import {
  hintCase,
  hintChars,
  hintRequired,
  loginBtn,
  loginWrapper,
  nameInput,
  passwordInput
} from '../view/components/login/login';

export class LoginController {
  private isFormValid: boolean;

  constructor() {
    this.isFormValid = false;
  }

  public handleLoginActions(): void {
    loginWrapper.addEventListener('input', this.updateValidityStatus.bind(this));

    loginBtn.addEventListener('click', this.login.bind(this));
  }

  private login(event: MouseEvent): void {
    event.preventDefault();
    if (!this.isFormValid) return;
    nameInput.value = '';
    passwordInput.value = '';
    Router.moveToPage(Page.Main);
  }

  private updateValidityStatus(): void {
    const nameInputValue: string = nameInput.value;
    const passwordInputValue: string = passwordInput.value;

    if (!nameInputValue || !passwordInputValue) {
      updateElemValidity(hintRequired, false);
    } else updateElemValidity(hintRequired, true);

    if (!nameInputValue || nameInputValue[0] !== nameInputValue[0].toUpperCase()) {
      updateElemValidity(hintCase, false);
    } else updateElemValidity(hintCase, true);

    const regexp: RegExp = /^[а-яА-Яa-zA-Z]+$/;
    if (!nameInputValue.match(regexp)) {
      updateElemValidity(hintChars, false);
    } else updateElemValidity(hintChars, true);

    if (
      hintRequired.classList.contains('valid') &&
      hintCase.classList.contains('valid') &&
      hintChars.classList.contains('valid')
    ) {
      this.isFormValid = true;
      updateElemValidity(loginBtn, true);
    } else {
      this.isFormValid = false;
      updateElemValidity(loginBtn, false);
    }
  }
}
