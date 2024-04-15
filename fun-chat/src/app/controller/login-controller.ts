import { Events, Page } from '../../interfaces';
import { Model } from '../model/model';
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
import { logoutBtn, username } from '../view/components/main-page/header/header';
import { clearLogin, markError } from '../view/login-view/login-view';
import { clearMainPage, updateMainPageData } from '../view/main-view/main-view';

export class LoginController {
  private isFormValid: boolean;

  private model: Model;

  constructor(model: Model) {
    this.isFormValid = false;
    this.model = model;

    document.addEventListener(Events.Logined, (event: Event): void => {
      if (event instanceof CustomEvent && event.detail.login === nameInput.value) {
        clearLogin();
        this.model.sendGetUsersRequests();
        Router.moveToPage(Page.Main);
      }
    });

    document.addEventListener(Events.Logout, (event: Event): void => {
      if (event instanceof CustomEvent && event.detail.login === username.textContent) {
        clearMainPage();
        Router.moveToPage(Page.Login);
      }
    });

    document.addEventListener(Events.IncorrectPassword, () => {
      clearLogin();
      markError(Events.IncorrectPassword);
    });

    document.addEventListener(Events.AlreadyAuth, () => {
      clearLogin();
      markError(Events.AlreadyAuth);
    });

    document.addEventListener(Events.UserList, (event: Event) => {
      if (event instanceof CustomEvent) {
        if (!this.model.login) throw new Error('login is undefined');
        updateMainPageData(event.detail.users, this.model.login);
      }
    });
  }

  public handleLoginActions(): void {
    loginWrapper.addEventListener('input', this.updateValidityStatus.bind(this));

    loginBtn.addEventListener('click', this.doLogin.bind(this));

    logoutBtn.addEventListener('click', this.doLogout.bind(this));
  }

  private doLogin(event: MouseEvent): void {
    event.preventDefault();
    if (!this.isFormValid) return;

    this.model.sendLogin(nameInput.value, passwordInput.value);
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

  private doLogout(): void {
    this.model.sendLogout();
  }
}
