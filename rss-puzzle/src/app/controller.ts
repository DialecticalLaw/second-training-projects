import Model from './model';

export default class Controller {
  private model: Model;

  isLogoutListener: boolean;

  constructor() {
    this.model = new Model();
    this.isLogoutListener = false;
  }

  public start(): void {
    this.model.initiate();
  }

  public handleActionRequest(action: string): void {
    const loginForm: HTMLFormElement | null = document.querySelector('.login-form');
    const loginButton: HTMLButtonElement | null = document.querySelector('.login-form__button');
    const logoutButton: HTMLButtonElement | null = document.querySelector('.logout');
    const startButton: HTMLButtonElement | null = document.querySelector('.start-content__button');
    switch (action) {
      case 'loginStart':
        if (loginForm && loginButton) {
          loginForm.addEventListener('input', Model.validate);
          loginButton.addEventListener('click', this.model.tryLogin.bind(this.model));
        }
        break;
      case 'loginEnd':
        if (logoutButton && !this.isLogoutListener) {
          logoutButton.addEventListener('click', this.model.logout.bind(this.model));
          this.isLogoutListener = true;
        }
        if (startButton) {
          startButton.addEventListener('click', this.model.startMainPage.bind(this.model));
        }
        break;
      default:
        break;
    }
  }
}
