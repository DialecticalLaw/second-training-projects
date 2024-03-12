import Model from './model';

export default class Controller {
  private model: Model;

  private isLogoutListener: boolean;

  constructor() {
    this.model = new Model();
    this.isLogoutListener = false;
  }

  public start(): void {
    this.model.initiate();
  }

  public handleActionRequest(action: string): void {
    switch (action) {
      case 'loginStart':
        this.handleLoginRequest('start');
        break;
      case 'loginEnd':
        this.handleLoginRequest('end');
        break;
      case 'startGame':
        this.handleStartRequest();
        break;
      case 'sourcesAppear':
        this.handleSourcesAppearRequest();
        break;
      default:
        break;
    }
  }

  private handleLoginRequest(action: 'start' | 'end'): void {
    if (action === 'start') {
      const loginForm: HTMLFormElement | null = document.querySelector('.login-form');
      const loginButton: HTMLButtonElement | null = document.querySelector('.login-form__button');

      if (loginForm && loginButton) {
        loginForm.addEventListener('input', Model.validate);
        loginButton.addEventListener('click', this.model.tryLogin.bind(this.model));
      }
    } else {
      const logoutButton: HTMLButtonElement | null = document.querySelector('.logout');
      if (logoutButton && !this.isLogoutListener) {
        logoutButton.addEventListener('click', this.model.logout.bind(this.model));
        this.isLogoutListener = true;
      }

      const startButton: HTMLButtonElement | null =
        document.querySelector('.start-content__button');
      if (startButton) {
        startButton.addEventListener('click', this.model.startMainPage.bind(this.model));
      }
    }
  }

  private handleStartRequest(): void {
    const continueBtn: HTMLButtonElement | null = document.querySelector(
      '.playarea__continue-button'
    );
    const checkBtn: HTMLButtonElement | null = document.querySelector('.playarea__check-button');

    if (continueBtn && checkBtn) {
      continueBtn.addEventListener('click', this.model.stepForward.bind(this.model));
      checkBtn.addEventListener('click', this.model.checkSentence.bind(this.model));
    }
  }

  private handleSourcesAppearRequest(): void {
    const allPlayareaSources: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source')
    );

    if (allPlayareaSources.length) {
      allPlayareaSources.forEach((source: HTMLDivElement) => {
        source.addEventListener('click', this.model.makeSourceReaction.bind(this.model));
      });
    }
  }
}
