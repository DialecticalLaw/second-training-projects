import Model from './model';

export default class Controller {
  private model: Model;

  private isLogoutListener: boolean;

  private isStartGameListener: boolean;

  constructor() {
    this.model = new Model();
    this.isLogoutListener = false;
    this.isStartGameListener = false;
  }

  public start(): void {
    this.model.initiate();
  }

  public handleActionRequest(action: string): void {
    const loginForm: HTMLFormElement | null = document.querySelector('.login-form');
    const loginButton: HTMLButtonElement | null = document.querySelector('.login-form__button');
    const logoutButton: HTMLButtonElement | null = document.querySelector('.logout');
    const startButton: HTMLButtonElement | null = document.querySelector('.start-content__button');
    const allPlayareaSources = [...document.querySelectorAll('.playarea__source')] as
      | HTMLDivElement[]
      | null;
    const continueBtn: HTMLButtonElement | null = document.querySelector(
      '.playarea__continue-button'
    );
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
      case 'startGame':
        if (allPlayareaSources && continueBtn) {
          allPlayareaSources.forEach((source: HTMLDivElement) => {
            source.addEventListener('click', this.model.makeSourceReaction.bind(this.model));
          });
          if (!this.isStartGameListener) {
            continueBtn.addEventListener('click', this.model.stepForward.bind(this.model));
            this.isStartGameListener = true;
          }
        }
        break;
      default:
        break;
    }
  }
}
