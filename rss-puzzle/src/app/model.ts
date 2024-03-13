import LocalStorageService from './services/local_storage_service';
import AppView from './view/app_view';
import wordCollectionLevel1 from './data/wordCollection/wordCollectionLevel1.json';
import { Level, Round } from '../interfaces';

export default class Model {
  private appView: AppView;

  private currentLevel?: Level;

  private roundIndex?: number;

  private sentenceIndex?: number;

  constructor() {
    this.appView = new AppView();
  }

  public initiate(): void {
    AppView.drawBasicMarkup();
    if (!LocalStorageService.isLocalStorageInit()) {
      LocalStorageService.initLocalStorage();
      this.appView.displayComponent('loginPage');
    } else {
      this.appView.displayComponent('startPage');
    }
  }

  public static validate(): void {
    const nameInput = document.querySelector('.login-form__input_name') as HTMLInputElement;
    const surnameInput = document.querySelector('.login-form__input_surname') as HTMLInputElement;
    const hints = [...document.querySelectorAll('.login-form__hint')] as HTMLLIElement[];

    if (Model.isLoginValidCharUsage(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[0], 'validity', { isValid: true });
    } else {
      AppView.switchComponentDisplay(hints[0], 'validity', { isValid: false });
    }

    if (Model.isLoginFirstCharCapitalized(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[1], 'validity', { isValid: true });
    } else {
      AppView.switchComponentDisplay(hints[1], 'validity', { isValid: false });
    }

    if (Model.isLoginValidLength(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[2], 'validity', { isValid: true });
    } else {
      AppView.switchComponentDisplay(hints[2], 'validity', { isValid: false });
    }

    if (Model.isLoginNotEmpty(nameInput, surnameInput)) {
      AppView.switchComponentDisplay(hints[3], 'validity', { isValid: true });
    } else {
      AppView.switchComponentDisplay(hints[3], 'validity', { isValid: false });
    }

    const loginButton = document.querySelector('.login-form__button') as HTMLButtonElement;
    if (hints.every((hint: HTMLLIElement) => hint.classList.contains('valid'))) {
      AppView.switchComponentDisplay(loginButton, 'validity', { isValid: true });
    } else {
      AppView.switchComponentDisplay(loginButton, 'validity', { isValid: false });
    }
  }

  public tryLogin(event: MouseEvent): void {
    event.preventDefault();
    let isLoginInputsValid: boolean = true;
    const hints = [...document.querySelectorAll('.login-form__hint')] as HTMLLIElement[];

    hints.forEach((hint: HTMLLIElement) => {
      if (!hint.classList.contains('valid')) isLoginInputsValid = false;
    });

    if (isLoginInputsValid) {
      const nameInput: HTMLInputElement | null = document.querySelector('.login-form__input_name');
      const surnameInput: HTMLInputElement | null = document.querySelector(
        '.login-form__input_surname'
      );

      if (nameInput && surnameInput) {
        LocalStorageService.saveStringData('name', nameInput.value);
        LocalStorageService.saveStringData('surname', surnameInput.value);
        LocalStorageService.saveBooleanData('isLogin', true);

        const loginForm = document.querySelector('.login-form') as HTMLFormElement;
        const hintsWrapper = document.querySelector('.login-form__hints') as HTMLUListElement;
        const nameWrapper = document.querySelector('.login-form__name-wrapper') as HTMLDivElement;
        const surnameWrapper = document.querySelector(
          '.login-form__surname-wrapper'
        ) as HTMLDivElement;

        AppView.removeComponent([hintsWrapper, nameWrapper, surnameWrapper, loginForm]);
        this.appView.displayComponent('startPage');
      }
    }
  }

  private static isLoginValidLength(name: HTMLInputElement, surname: HTMLInputElement): boolean {
    return name.value.length >= 3 && surname.value.length >= 4;
  }

  private static isLoginValidCharUsage(name: HTMLInputElement, surname: HTMLInputElement): boolean {
    const validCharacters: RegExp = /^[a-zA-Z-]+$/;
    return validCharacters.test(name.value) && validCharacters.test(surname.value);
  }

  private static isLoginFirstCharCapitalized(
    name: HTMLInputElement,
    surname: HTMLInputElement
  ): boolean {
    if (name.value.length === 0 || surname.value.length === 0) return false;
    return (
      name.value[0] === name.value[0].toUpperCase() &&
      surname.value[0] === surname.value[0].toUpperCase()
    );
  }

  private static isLoginNotEmpty(name: HTMLInputElement, surname: HTMLInputElement): boolean {
    if (name.value.length === 0 || surname.value.length === 0) return false;
    return true;
  }

  public startMainPage(): void {
    const startContent = document.querySelector('.start-content') as HTMLDivElement;
    AppView.removeComponent([startContent]);
    this.appView.displayComponent('mainPage');
    this.startGame();
  }

  private startGame(): void {
    this.currentLevel = wordCollectionLevel1;
    if (this.roundIndex === undefined) {
      this.roundIndex = 0;
    } else {
      this.roundIndex += 1;
    }
    this.nextSentence();
  }

  private nextSentence(): void {
    if (this.sentenceIndex === undefined) {
      this.sentenceIndex = 0;
    }

    if (this.currentLevel !== undefined && this.roundIndex !== undefined) {
      const round: Round = this.currentLevel.rounds[this.roundIndex];
      const sentence = round.words[this.sentenceIndex].textExample.split(' ');
      this.appView.displayComponent('sourceWords', {
        componentsText: sentence,
        sentenceIndex: this.sentenceIndex
      });
    }
  }

  public logout(): void {
    this.roundIndex = undefined;
    this.sentenceIndex = undefined;

    const title = document.querySelector('.title') as HTMLHeadingElement;
    const logoutButton = document.querySelector('.logout') as HTMLDivElement;
    const startContentWrapper: HTMLDivElement | null = document.querySelector('.start-content');
    if (startContentWrapper) {
      AppView.removeComponent([startContentWrapper]);
    }

    const playarea: HTMLDivElement | null = document.querySelector('.playarea');
    const playareaPuzzles: HTMLDivElement | null = document.querySelector('.playarea__puzzles');
    const playareaSources: HTMLDivElement | null = document.querySelector('.playarea__sources');
    const buttonsWrapper: HTMLDivElement | null = document.querySelector(
      '.playarea__buttons-wrapper'
    );

    if (playarea && playareaPuzzles && playareaSources && buttonsWrapper) {
      AppView.removeComponent([playarea, playareaPuzzles, playareaSources, buttonsWrapper]);
    }

    AppView.removeComponent([title, logoutButton]);
    LocalStorageService.clearUserData();
    this.appView.displayComponent('loginPage');
  }

  public makeSourceReaction(event: MouseEvent): void {
    const eventTarget = event.target as HTMLDivElement | null;
    const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');

    if (!eventTarget || !actionBtn) return;

    AppView.moveComponent(eventTarget, 'moveSource');
    Model.clearSourcesValidity();
    this.updateActionBtnState();
  }

  private updateActionBtnState(): void {
    const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');
    const autoCompleteBtn: HTMLButtonElement | null = document.querySelector(
      '.playarea__auto-complete'
    );
    if (!actionBtn || !autoCompleteBtn) return;

    if (Model.isSentenceFilled()) {
      if (this.isSentenceCorrect()) {
        AppView.switchComponentDisplay(actionBtn, 'validity', { isValid: true });
        AppView.switchComponentDisplay(actionBtn, 'continue-active', { isValid: true });
        AppView.switchComponentDisplay(autoCompleteBtn, 'validity', { isValid: false });
      } else {
        AppView.switchComponentDisplay(actionBtn, 'validity', { isValid: true });
        AppView.switchComponentDisplay(autoCompleteBtn, 'validity', { isValid: true });
      }
      return;
    }

    AppView.switchComponentDisplay(actionBtn, 'continue-active', { isValid: false });
    AppView.switchComponentDisplay(actionBtn, 'validity', { isValid: false });
    AppView.switchComponentDisplay(autoCompleteBtn, 'validity', { isValid: true });
  }

  private static clearSourcesValidity(): void {
    const allSources: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source_active')
    );

    allSources.forEach((source: HTMLDivElement) => {
      AppView.switchComponentDisplay(source, 'validity');
    });
  }

  private static isSentenceFilled(): boolean {
    const allSentencePlaces = [
      ...document.querySelectorAll('.playarea__sentence-place_active')
    ] as HTMLDivElement[];
    let result = true;
    allSentencePlaces.forEach((place: HTMLDivElement): void => {
      if (!place.children.length) result = false;
    });
    return result;
  }

  public stepForward(): void {
    const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');
    const autoCompleteBtn: HTMLButtonElement | null = document.querySelector(
      '.playarea__auto-complete'
    );

    if (actionBtn && autoCompleteBtn) {
      Model.disableActiveElems();
      if (this.sentenceIndex === undefined || this.roundIndex === undefined) {
        throw new Error('sentenceIndex or roundIndex is undefined');
      }

      const allSourcePlaces: HTMLDivElement[] = Array.from(
        document.querySelectorAll('.playarea__source-place')
      );

      if (this.sentenceIndex < 9) {
        // next sentence
        this.sentenceIndex += 1;
        AppView.removeComponent(allSourcePlaces);
        this.nextSentence();
      } else {
        // next round
        const allSentencePlaces: HTMLDivElement[] = Array.from(
          document.querySelectorAll('.playarea__sentence-place')
        );
        this.roundIndex += 1;
        this.sentenceIndex = 0;
        AppView.removeComponent([...allSentencePlaces, ...allSourcePlaces]);
        this.nextSentence();
      }

      AppView.switchComponentDisplay(actionBtn, 'continue-active', { isValid: false });
      AppView.switchComponentDisplay(actionBtn, 'validity', { isValid: false });
      AppView.switchComponentDisplay(autoCompleteBtn, 'validity', { isValid: true });
    }
  }

  public checkSentence(): void {
    const sourcesInSentence: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__sentence-place .playarea__source_active')
    );

    const realSentence: string[] = [];
    sourcesInSentence.forEach((source: HTMLDivElement): void => {
      if (source.textContent) {
        realSentence.push(source.textContent);
      }
    });

    if (
      this.currentLevel !== undefined &&
      this.roundIndex !== undefined &&
      this.sentenceIndex !== undefined
    ) {
      const round: Round = this.currentLevel.rounds[this.roundIndex];
      const exampleSentence: string[] = round.words[this.sentenceIndex].textExample.split(' ');

      sourcesInSentence.forEach((source: HTMLDivElement, index): void => {
        if (source.textContent === exampleSentence[index]) {
          AppView.switchComponentDisplay(source, 'validity', { isValid: true });
        } else {
          AppView.switchComponentDisplay(source, 'validity', { isValid: false });
        }
      });
    }
  }

  private static disableActiveElems(): void {
    const allSources: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source_active')
    );
    const allSentencePlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__sentence-place_active')
    );

    allSources.forEach((source: HTMLDivElement) => {
      AppView.switchComponentDisplay(source, 'disable', { class: 'playarea__source_active' });
    });

    allSentencePlaces.forEach((place: HTMLDivElement) => {
      AppView.switchComponentDisplay(place, 'disable', {
        class: 'playarea__sentence-place_active'
      });
    });
  }

  private isSentenceCorrect(): boolean {
    const sourcesInSentence: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__sentence-place .playarea__source_active')
    );
    const currentSentence: string[] = [];
    sourcesInSentence.forEach((source: HTMLDivElement) => {
      const word: string | null = source.textContent;
      if (word) {
        currentSentence.push(word);
      }
    });
    if (this.roundIndex !== undefined && this.sentenceIndex !== undefined) {
      if (
        currentSentence.join(' ') ===
        this.currentLevel?.rounds[this.roundIndex].words[this.sentenceIndex].textExample
      ) {
        return true;
      }
    }
    return false;
  }

  public completeSentenceAuto(): void {
    if (
      this.sentenceIndex === undefined ||
      this.roundIndex === undefined ||
      this.currentLevel === undefined
    )
      throw new Error('sentenceIndex or roundIndex is undefined');

    const round: Round = this.currentLevel.rounds[this.roundIndex];
    const exampleSentence: string[] = round.words[this.sentenceIndex].textExample.split(' ');

    const allSentencePlaces = [
      ...document.querySelectorAll('.playarea__sentence-place_active')
    ] as HTMLDivElement[];

    const allSources: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source_active')
    );

    allSentencePlaces.forEach((place: HTMLDivElement, index: number) => {
      const exampleWord = exampleSentence[index];
      const source: HTMLDivElement = Model.findSource(exampleWord);
      source.classList.add('marked');
      AppView.moveComponent(source, 'setSource', place);
      Model.clearSourcesValidity();
      this.updateActionBtnState();
    });

    allSources.forEach((source: HTMLDivElement) => {
      source.classList.remove('marked');
    });
  }

  private static findSource(word: string): HTMLDivElement {
    const allSources: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source_active')
    );
    const result: HTMLDivElement | undefined = allSources.find(
      (source: HTMLDivElement) =>
        source.textContent === word && !source.classList.contains('marked')
    );
    if (result) return result;
    throw new Error('Source not found');
  }
}
