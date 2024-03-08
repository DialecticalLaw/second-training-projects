import Model from './model';

export default class Controller {
  private model: Model;

  constructor() {
    this.model = new Model();
  }

  public start(): void {
    this.model.initiate();
    const loginForm: HTMLFormElement | null = document.querySelector('.login-form');
    const loginButton: HTMLButtonElement | null = document.querySelector('.login-form__button');
    if (loginForm) loginForm.addEventListener('input', Model.validate);
    if (loginButton) loginButton.addEventListener('click', this.model.tryLogin.bind(this.model));
  }

  public handleActionRequest(action: string): void {
    const logoutButton: HTMLButtonElement | null = document.querySelector('.logout');
    switch (action) {
      case 'login':
        if (logoutButton)
          logoutButton.addEventListener('click', this.model.logout.bind(this.model));
        break;

      default:
        break;
    }
  }
}
