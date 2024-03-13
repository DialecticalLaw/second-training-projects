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
      case 'startGame':
        this.handleStartRequest();
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
      document.querySelectorAll('.playarea__source_active')
    );

    allPlayareaSources.forEach((source: HTMLDivElement) => {
      source.addEventListener('dragstart', (event: DragEvent) => {
        const targetSource = event.currentTarget as HTMLDivElement;
        event.dataTransfer?.setData('id', targetSource.id);
      });
    });
    this.listenSentencePlaces();
    this.listenSourcePlaces();

    if (allPlayareaSources.length) {
      allPlayareaSources.forEach((source: HTMLDivElement) => {
        source.addEventListener('click', this.model.makeSourceReaction.bind(this.model));
      });
    }
  }

  private listenSentencePlaces(): void {
    const allSentencePlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__sentence-place_active')
    );
    allSentencePlaces.forEach((sentencePlace: HTMLDivElement) => {
      sentencePlace.addEventListener('dragenter', (event: DragEvent) => {
        event.preventDefault();
        const targetPlace = event.currentTarget as HTMLDivElement;
        if (targetPlace.classList.contains('playarea__sentence-place_active')) {
          targetPlace.classList.add('ondrag');
        }
      });

      sentencePlace.addEventListener('dragover', (event: DragEvent) => {
        const targetPlace = event.currentTarget as HTMLDivElement;
        if (targetPlace.classList.contains('playarea__sentence-place_active')) {
          event.preventDefault();
        }
      });

      sentencePlace.addEventListener('dragleave', (event: DragEvent) => {
        const targetPlace = event.currentTarget as HTMLDivElement;
        targetPlace.classList.remove('ondrag');
      });

      sentencePlace.addEventListener('drop', (event: DragEvent) => {
        const targetPlace = event.currentTarget as HTMLDivElement;
        const sourceId = event.dataTransfer?.getData('id') as string;
        const source: HTMLDivElement | null = document.querySelector(`#${sourceId}`);
        if (source) {
          this.model.dropSource(targetPlace, source);
        }
        targetPlace.classList.remove('ondrag');
      });
    });
  }

  private listenSourcePlaces(): void {
    const allSourcePlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source-place')
    );

    allSourcePlaces.forEach((sourcePlace: HTMLDivElement) => {
      sourcePlace.addEventListener('dragenter', (event: DragEvent) => {
        event.preventDefault();
        const targetPlace = event.currentTarget as HTMLDivElement;
        targetPlace.classList.add('ondrag');
      });

      sourcePlace.addEventListener('dragover', (event: DragEvent) => {
        event.preventDefault();
      });

      sourcePlace.addEventListener('dragleave', (event: DragEvent) => {
        const targetPlace = event.currentTarget as HTMLDivElement;
        targetPlace.classList.remove('ondrag');
      });

      sourcePlace.addEventListener('drop', (event: DragEvent) => {
        const targetPlace = event.currentTarget as HTMLDivElement;
        const sourceId = event.dataTransfer?.getData('id') as string;
        const source: HTMLDivElement | null = document.querySelector(`#${sourceId}`);
        if (source) {
          this.model.dropSource(targetPlace, source);
        }
        targetPlace.classList.remove('ondrag');
      });
    });
  }

  private handleStartRequest(): void {
    const autoCompleteBtn: HTMLButtonElement | null = document.querySelector(
      '.playarea__auto-complete'
    );

    if (autoCompleteBtn) {
      autoCompleteBtn.addEventListener('click', this.model.completeSentenceAuto.bind(this.model));
    }
  }
}
