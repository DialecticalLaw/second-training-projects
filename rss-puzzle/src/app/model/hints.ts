import { app } from '../..';
import { ChangeType, HintsStatus } from '../../interfaces';
import AppView from '../view/app_view';
import { toggleBackground } from './updateButtons';

function toggleTranslateHint(hintElem: HTMLButtonElement): void {
  const translateText: HTMLDivElement | null = document.querySelector('.playarea__translate-text');
  if (translateText) {
    if (hintElem.classList.contains('valid')) {
      app.model.localStorageService.saveBooleanData('translateHint', false);
      AppView.switchComponentDisplay(hintElem, ChangeType.Validity, { isValid: false });
      AppView.switchComponentDisplay(translateText, ChangeType.Validity, { isValid: false });
    } else {
      app.model.localStorageService.saveBooleanData('translateHint', true);
      AppView.switchComponentDisplay(hintElem, ChangeType.Validity, { isValid: true });
      AppView.switchComponentDisplay(translateText, ChangeType.Validity, { isValid: true });
    }
  }
}

function toggleAudioHint(hintElem: HTMLButtonElement): void {
  const audioIcon: HTMLDivElement | null = document.querySelector('.playarea__audio-icon');
  if (audioIcon) {
    if (hintElem.classList.contains('valid')) {
      app.model.localStorageService.saveBooleanData('audioHint', false);
      AppView.switchComponentDisplay(hintElem, ChangeType.Validity, { isValid: false });
      AppView.switchComponentDisplay(audioIcon, ChangeType.Validity, { isValid: false });
    } else {
      app.model.localStorageService.saveBooleanData('audioHint', true);
      AppView.switchComponentDisplay(hintElem, ChangeType.Validity, { isValid: true });
      AppView.switchComponentDisplay(audioIcon, ChangeType.Validity, { isValid: true });
    }
  }
}

function toggleBackgroundHint(hintElem: HTMLButtonElement): void {
  if (hintElem.classList.contains('valid')) {
    // disable button
    AppView.switchComponentDisplay(hintElem, ChangeType.Validity, { isValid: false });
    app.model.localStorageService.saveBooleanData('backgroundHint', false);
    toggleBackground(true);
  } else {
    // enable button
    AppView.switchComponentDisplay(hintElem, ChangeType.Validity, { isValid: true });
    app.model.localStorageService.saveBooleanData('backgroundHint', true);
    toggleBackground(false);
  }
}

export function playAudioHint(isEnded: boolean): void {
  const audioIcon: HTMLDivElement | null = document.querySelector('.playarea__audio-icon');
  if (isEnded && audioIcon) {
    AppView.switchComponentDisplay(audioIcon, ChangeType.RemoveClass, { class: 'active' });
    return;
  }
  if (
    app.model.currentLevel !== undefined &&
    app.model.roundIndex !== undefined &&
    app.model.sentenceIndex !== undefined
  ) {
    const audioElem: HTMLAudioElement | null = document.querySelector('.playarea__audio');
    if (audioElem && audioIcon) {
      AppView.switchComponentDisplay(audioIcon, ChangeType.AddClass, { class: 'active' });
      audioElem.play();
    }
  }
}

export function toggleHint(hintElem: HTMLButtonElement): void {
  if (hintElem.classList.contains('playarea__translate-hint')) {
    toggleTranslateHint(hintElem);
  } else if (hintElem.classList.contains('playarea__audio-hint')) {
    toggleAudioHint(hintElem);
  } else if (hintElem.classList.contains('playarea__background-hint')) {
    toggleBackgroundHint(hintElem);
  }
}

export function initHintsAccordingSavedData(): void {
  const translateHintStatus = app.model.localStorageService.getData('translateHint');
  const audioHintStatus = app.model.localStorageService.getData('audioHint');
  const backgroundHintStatus = app.model.localStorageService.getData('backgroundHint');

  const hintsStatus: HintsStatus = {
    translateHintStatus,
    audioHintStatus,
    backgroundHintStatus
  };
  AppView.initHints(hintsStatus);
}
