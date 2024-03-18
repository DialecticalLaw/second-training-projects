import { HandleAction } from '../interfaces';
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

  public handleActionRequest(action: HandleAction): void {
    switch (action) {
      case HandleAction.LoginStart:
        this.handleLoginRequest(action);
        break;
      case HandleAction.LoginEnd:
        this.handleLoginRequest(action);
        break;
      case HandleAction.StartGame:
        this.handleStartRequest();
        break;
      case HandleAction.Check:
        this.handlePlayareaButtonRequest(action);
        break;
      case HandleAction.Continue:
        this.handlePlayareaButtonRequest(action);
        break;
      case HandleAction.SourcesAppear:
        this.handleSourcesAppearRequest();
        break;
      case HandleAction.ResizeAgain:
        this.handleResizeSourcesAgain();
        break;
      default:
        break;
    }
  }

  private handleLoginRequest(action: HandleAction.LoginStart | HandleAction.LoginEnd): void {
    if (action === HandleAction.LoginStart) {
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

  private handlePlayareaButtonRequest(action: HandleAction.Check | HandleAction.Continue): void {
    const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');
    if (action === HandleAction.Check && actionBtn && !this.isChecked) {
      this.isChecked = true;
      this.isForwarded = false;
      this.checkSentence = this.model.checkSentence.bind(this.model);
      if (this.stepForward) {
        actionBtn.removeEventListener('click', this.stepForward);
      }
      actionBtn.addEventListener('click', this.checkSentence);
      return;
    }

    if (action === HandleAction.Continue && this.checkSentence && actionBtn && !this.isForwarded) {
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

    allPlayareaSources.forEach((source: HTMLDivElement): void => {
      source.addEventListener('dragstart', (event: DragEvent): void => {
        const targetSource = event.currentTarget as HTMLDivElement;
        event.dataTransfer?.setData('id', targetSource.id);
      });
    });
    this.listenSentencePlaces();
    this.listenSourcePlaces();

    if (allPlayareaSources.length) {
      allPlayareaSources.forEach((source: HTMLDivElement): void => {
        source.addEventListener('click', this.model.makeSourceReaction.bind(this.model));
      });
    }
  }

  private listenSentencePlaces(): void {
    const allSentencePlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__sentence-place_active')
    );
    allSentencePlaces.forEach((sentencePlace: HTMLDivElement): void => {
      sentencePlace.addEventListener('dragenter', (event: DragEvent): void => {
        event.preventDefault();
        const targetPlace = event.currentTarget as HTMLDivElement;
        if (targetPlace.classList.contains('playarea__sentence-place_active')) {
          targetPlace.classList.add('ondrag');
        }
      });

      sentencePlace.addEventListener('dragover', (event: DragEvent): void => {
        const targetPlace = event.currentTarget as HTMLDivElement;
        if (targetPlace.classList.contains('playarea__sentence-place_active')) {
          event.preventDefault();
        }
      });

      sentencePlace.addEventListener('dragleave', (event: DragEvent): void => {
        const targetPlace = event.currentTarget as HTMLDivElement;
        targetPlace.classList.remove('ondrag');
      });

      sentencePlace.addEventListener('drop', (event: DragEvent): void => {
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

    allSourcePlaces.forEach((sourcePlace: HTMLDivElement): void => {
      sourcePlace.addEventListener('dragenter', (event: DragEvent) => {
        event.preventDefault();
        const targetPlace = event.currentTarget as HTMLDivElement;
        targetPlace.classList.add('ondrag');
      });

      sourcePlace.addEventListener('dragover', (event: DragEvent): void => {
        event.preventDefault();
      });

      sourcePlace.addEventListener('dragleave', (event: DragEvent): void => {
        const targetPlace = event.currentTarget as HTMLDivElement;
        targetPlace.classList.remove('ondrag');
      });

      sourcePlace.addEventListener('drop', (event: DragEvent): void => {
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
    this.handleSelectOptionsRequest();
    this.handleAudioHintRequest();

    const autoCompleteBtn: HTMLButtonElement | null = document.querySelector(
      '.playarea__auto-complete'
    );
    const translateBtn: HTMLButtonElement | null = document.querySelector(
      '.playarea__translate-hint'
    );
    const backgroundHintBtn: HTMLButtonElement | null = document.querySelector(
      '.playarea__background-hint'
    );

    if (autoCompleteBtn && translateBtn && backgroundHintBtn) {
      autoCompleteBtn.addEventListener('click', this.model.completeSentenceAuto.bind(this.model));
      translateBtn.addEventListener('click', this.model.toggleHint.bind(this.model, translateBtn));
      backgroundHintBtn.addEventListener(
        'click',
        this.model.toggleHint.bind(this.model, backgroundHintBtn)
      );
      window.addEventListener('resize', this.model.resizeSources.bind(this.model, undefined));
    }
  }

  private handleSelectOptionsRequest(): void {
    const levelSelect: HTMLSelectElement | null = document.querySelector('.playarea__select-level');
    const roundSelect: HTMLSelectElement | null = document.querySelector('.playarea__select-round');
    if (levelSelect && roundSelect) {
      levelSelect.addEventListener('change', this.model.changeLevel.bind(this.model));
      roundSelect.addEventListener('change', this.model.changeRound.bind(this.model));
    }
  }

  private handleAudioHintRequest(): void {
    const audioBtn: HTMLButtonElement | null = document.querySelector('.playarea__audio-hint');
    const audioIcon: HTMLDivElement | null = document.querySelector('.playarea__audio-icon');
    const audioElem: HTMLAudioElement | null = document.querySelector('.playarea__audio');

    if (audioBtn && audioIcon && audioElem) {
      audioBtn.addEventListener('click', this.model.toggleHint.bind(this.model, audioBtn));
      audioIcon.addEventListener('click', this.model.playAudioHint.bind(this.model, false));
      audioElem.addEventListener('ended', this.model.playAudioHint.bind(this.model, true));
    }
  }

  private handleResizeSourcesAgain(): void {
    this.model.resizeSources(true);
  }
}
