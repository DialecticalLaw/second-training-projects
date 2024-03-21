import { app } from '../..';
import { ChangeType, Round } from '../../interfaces';
import AppView from '../view/app_view';

function isSentenceFilled(): boolean {
  const allSentencePlaces = [
    ...document.querySelectorAll('.playarea__sentence-place_active')
  ] as HTMLDivElement[];
  let result = true;
  allSentencePlaces.forEach((place: HTMLDivElement): void => {
    if (!place.children.length) result = false;
  });
  return result;
}

export function isSentenceCorrect(): boolean {
  const sourcesInSentence: HTMLDivElement[] = Array.from(
    document.querySelectorAll('.playarea__sentence-place .playarea__source_active')
  );
  const currentSentence: string[] = [];
  sourcesInSentence.forEach((source: HTMLDivElement): void => {
    const word: string | null = source.textContent;
    if (word) {
      currentSentence.push(word);
    }
  });
  if (app.model.roundIndex !== undefined && app.model.sentenceIndex !== undefined) {
    if (
      currentSentence.join(' ') ===
      app.model.currentLevel?.rounds[app.model.roundIndex].words[app.model.sentenceIndex]
        .textExample
    ) {
      return true;
    }
  }
  return false;
}

function updateButtonsOnCorrectStatus(): void {
  const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');
  const autoCompleteBtn: HTMLButtonElement | null = document.querySelector(
    '.playarea__auto-complete'
  );
  const translateText: HTMLParagraphElement | null = document.querySelector(
    '.playarea__translate-text'
  );
  const audioIcon: HTMLButtonElement | null = document.querySelector('.playarea__audio-icon');

  if (!actionBtn || !autoCompleteBtn || !translateText || !audioIcon) {
    return;
  }

  AppView.switchComponentDisplay(translateText, ChangeType.AddClass, { class: 'pseudo-valid' });
  AppView.switchComponentDisplay(audioIcon, ChangeType.AddClass, { class: 'pseudo-valid' });
  AppView.switchComponentDisplay(actionBtn, ChangeType.Validity, { isValid: true });
  AppView.switchComponentDisplay(actionBtn, ChangeType.ContinueActive, { isValid: true });
  AppView.switchComponentDisplay(autoCompleteBtn, ChangeType.Validity, { isValid: false });
}

function updateButtonsOnNeutralStatus(): void {
  const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');
  const autoCompleteBtn: HTMLButtonElement | null = document.querySelector(
    '.playarea__auto-complete'
  );
  const translateText: HTMLParagraphElement | null = document.querySelector(
    '.playarea__translate-text'
  );
  const audioIcon: HTMLButtonElement | null = document.querySelector('.playarea__audio-icon');

  if (!actionBtn || !autoCompleteBtn || !translateText || !audioIcon) {
    return;
  }

  AppView.switchComponentDisplay(translateText, ChangeType.RemoveClass, {
    class: 'pseudo-valid'
  });
  AppView.switchComponentDisplay(audioIcon, ChangeType.RemoveClass, { class: 'pseudo-valid' });
  AppView.switchComponentDisplay(actionBtn, ChangeType.ContinueActive, { isValid: false });
  AppView.switchComponentDisplay(actionBtn, ChangeType.Validity, { isValid: false });
  AppView.switchComponentDisplay(autoCompleteBtn, ChangeType.Validity, { isValid: true });
}

function updateButtonsOnWrongStatus(): void {
  const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');
  const autoCompleteBtn: HTMLButtonElement | null = document.querySelector(
    '.playarea__auto-complete'
  );
  const translateText: HTMLParagraphElement | null = document.querySelector(
    '.playarea__translate-text'
  );
  const audioIcon: HTMLButtonElement | null = document.querySelector('.playarea__audio-icon');

  if (!actionBtn || !autoCompleteBtn || !translateText || !audioIcon) {
    return;
  }

  AppView.switchComponentDisplay(translateText, ChangeType.RemoveClass, {
    class: 'pseudo-valid'
  });
  AppView.switchComponentDisplay(audioIcon, ChangeType.RemoveClass, { class: 'pseudo-valid' });
  AppView.switchComponentDisplay(actionBtn, ChangeType.ContinueActive, { isValid: false });
  AppView.switchComponentDisplay(actionBtn, ChangeType.Validity, { isValid: true });
  AppView.switchComponentDisplay(autoCompleteBtn, ChangeType.Validity, { isValid: true });
}

export function toggleBackground(isValid: boolean): void {
  const allActiveSources: HTMLDivElement[] = Array.from(
    document.querySelectorAll('.playarea__source_active')
  );

  if (isValid) {
    if (isSentenceCorrect()) return;
    allActiveSources.forEach((source: HTMLDivElement): void => {
      const sourceImg = source.firstElementChild as HTMLDivElement;
      const sourceOuterPeg = source.lastElementChild as HTMLDivElement;

      AppView.switchComponentDisplay(sourceImg, ChangeType.UpdateHint, { imageSrc: 'hide' });
      if (sourceOuterPeg.classList.contains('playarea__peg_outer')) {
        AppView.switchComponentDisplay(sourceOuterPeg, ChangeType.UpdateHint, {
          imageSrc: 'hide'
        });
      }
    });
  } else {
    allActiveSources.forEach((source: HTMLDivElement): void => {
      if (app.model.currentLevel === undefined || app.model.roundIndex === undefined) {
        throw new Error('currentLevel or roundIndex is undefined at toggleBackground (model.ts)');
      }
      const sourceImg = source.firstElementChild as HTMLDivElement;
      const sourceOuterPeg = source.lastElementChild as HTMLDivElement;
      const round: Round = app.model.currentLevel.rounds[app.model.roundIndex];
      const imageSrc: string = round.levelData.imageSrc;

      AppView.switchComponentDisplay(sourceImg, ChangeType.UpdateHint, { imageSrc });
      if (sourceOuterPeg.classList.contains('playarea__peg_outer')) {
        AppView.switchComponentDisplay(sourceOuterPeg, ChangeType.UpdateHint, { imageSrc });
      }
    });
  }
}

export function updateButtonsState(): void {
  const backgroundHintBtn: HTMLButtonElement | null = document.querySelector(
    '.playarea__background-hint'
  );

  if (!backgroundHintBtn) return;
  if (isSentenceFilled()) {
    if (isSentenceCorrect()) {
      updateButtonsOnCorrectStatus();

      if (!backgroundHintBtn.classList.contains('valid')) {
        toggleBackground(false);
      }
    } else {
      updateButtonsOnWrongStatus();
      if (!backgroundHintBtn.classList.contains('valid')) {
        toggleBackground(true);
      }
    }
    return;
  }

  updateButtonsOnNeutralStatus();
  if (!backgroundHintBtn.classList.contains('valid')) {
    toggleBackground(true);
  }
}

export function updateButtonsOnShowImage(): void {
  const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');
  if (actionBtn) {
    AppView.switchComponentDisplay(actionBtn, ChangeType.ContinueActive, { isShowImage: true });
  }
}

export function updateButtonsOnStepForward(): void {
  const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');
  const audioIcon: HTMLDivElement | null = document.querySelector('.playarea__audio-icon');
  const autoCompleteBtn: HTMLButtonElement | null = document.querySelector(
    '.playarea__auto-complete'
  );
  const translateText: HTMLParagraphElement | null = document.querySelector(
    '.playarea__translate-text'
  );
  const backgroundHintBtn: HTMLButtonElement | null = document.querySelector(
    '.playarea__background-hint'
  );

  if (translateText && actionBtn && autoCompleteBtn && audioIcon && backgroundHintBtn) {
    AppView.switchComponentDisplay(translateText, ChangeType.RemoveClass, {
      class: 'pseudo-valid'
    });
    AppView.switchComponentDisplay(audioIcon, ChangeType.RemoveClass, { class: 'pseudo-valid' });
    AppView.switchComponentDisplay(actionBtn, ChangeType.ContinueActive, { isValid: false });
    AppView.switchComponentDisplay(actionBtn, ChangeType.Validity, { isValid: false });
    AppView.switchComponentDisplay(autoCompleteBtn, ChangeType.Validity, { isValid: true });
    AppView.switchComponentDisplay(audioIcon, ChangeType.RemoveClass, { class: 'active' });
    if (backgroundHintBtn.classList.contains('valid')) {
      toggleBackground(false);
    } else {
      toggleBackground(true);
    }
  }
}
