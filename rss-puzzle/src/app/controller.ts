import Model from './model';

export default class Controller {
  private model: Model;

  private isLogoutListener: boolean;

  private checkSentence?: () => void;

  private isChecked?: boolean;

  private stepForward?: () => void;

  private isForwarded?: boolean;

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
        this.handleLoginRequest(action);
        break;
      case 'loginEnd':
        this.handleLoginRequest(action);
        break;
      case 'check':
        this.handlePlayareaButtonRequest(action);
        break;
      case 'continue':
        this.handlePlayareaButtonRequest(action);
        break;
      case 'sourcesAppear':
        this.handleSourcesAppearRequest();
        break;
      default:
        break;
    }
  }

  private handleLoginRequest(action: 'loginStart' | 'loginEnd'): void {
    if (action === 'loginStart') {
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

  private handlePlayareaButtonRequest(action: 'check' | 'continue'): void {
    const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');
    if (action === 'check' && actionBtn && !this.isChecked) {
      this.isChecked = true;
      this.isForwarded = false;
      this.checkSentence = this.model.checkSentence.bind(this.model);
      if (this.stepForward) {
        actionBtn.removeEventListener('click', this.stepForward);
      }
      actionBtn.addEventListener('click', this.checkSentence);
      return;
    }

    if (action === 'continue' && this.checkSentence && actionBtn && !this.isForwarded) {
      this.isChecked = false;
      this.isForwarded = true;
      this.stepForward = this.model.stepForward.bind(this.model);
      actionBtn.removeEventListener('click', this.checkSentence);
      actionBtn.addEventListener('click', this.stepForward);
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
