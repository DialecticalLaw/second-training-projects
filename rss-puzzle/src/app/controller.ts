import Model from './model';

export default class Controller {
  public static start(): void {
    Model.initiate();
    const loginForm: HTMLFormElement | null = document.querySelector('.login-form');
    const loginButton: HTMLButtonElement | null = document.querySelector('.login-form__button');
    if (loginForm) loginForm.addEventListener('input', Model.validate);
    if (loginButton) loginButton.addEventListener('click', Model.tryLogin);
  }
}
