import { HandleAction } from '../interfaces';
import completeSentenceAuto from './model/complete_sentence_auto';
import dropSource from './model/drop_source';
import { playAudioHint, toggleHint } from './model/hints';
import Login from './model/login';
import Model from './model/model';
import resizeSources from './model/resize_sources';
import makeSourceReaction from './model/source_reaction';
import startMainPage from './model/start_main_page';
import Validate from './model/validate';

export default class Controller {
  public model: Model;

  private login: Login;

  private isLogoutListener: boolean;

  private checkSentence?: () => void;

  private isChecked?: boolean;

  private stepForward?: () => void;

  private isForwarded?: boolean;

  constructor() {
    this.model = new Model();
    this.login = new Login();
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
        Controller.handleSourcesAppearRequest();
        break;
      case HandleAction.ResizeAgain:
        Controller.handleResizeSourcesAgain();
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
        loginForm.addEventListener('input', Validate.validate);
        loginButton.addEventListener('click', this.login.tryLogin.bind(this.login));
      }
    } else {
      const logoutButton: HTMLButtonElement | null = document.querySelector('.logout');
      if (logoutButton && !this.isLogoutListener) {
        logoutButton.addEventListener('click', this.login.logout.bind(this.login));
        this.isLogoutListener = true;
      }

      const startButton: HTMLButtonElement | null =
        document.querySelector('.start-content__button');
      if (startButton) {
        startButton.addEventListener('click', startMainPage);
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

  private static handleSourcesAppearRequest(): void {
    const allPlayareaSources: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source_active')
    );

    allPlayareaSources.forEach((source: HTMLDivElement): void => {
      source.addEventListener('dragstart', (event: DragEvent): void => {
        const targetSource = event.currentTarget as HTMLDivElement;
        event.dataTransfer?.setData('id', targetSource.id);
      });
    });
    Controller.listenSentencePlaces();
    Controller.listenSourcePlaces();

    if (allPlayareaSources.length) {
      allPlayareaSources.forEach((source: HTMLDivElement): void => {
        source.addEventListener('click', makeSourceReaction);
      });
    }
  }

  private static listenSentencePlaces(): void {
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
          dropSource(targetPlace, source);
        }
        targetPlace.classList.remove('ondrag');
      });
    });
  }

  private static listenSourcePlaces(): void {
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
          dropSource(targetPlace, source);
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
      autoCompleteBtn.addEventListener('click', completeSentenceAuto);
      translateBtn.addEventListener('click', toggleHint.bind(null, translateBtn));
      backgroundHintBtn.addEventListener('click', toggleHint.bind(null, backgroundHintBtn));
      window.addEventListener('resize', resizeSources.bind(null, undefined));
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
      audioBtn.addEventListener('click', toggleHint.bind(this.model, audioBtn));
      audioIcon.addEventListener('click', playAudioHint.bind(null, false));
      audioElem.addEventListener('ended', playAudioHint.bind(null, true));
    }
  }

  private static handleResizeSourcesAgain(): void {
    resizeSources.bind(null, true);
  }
}
