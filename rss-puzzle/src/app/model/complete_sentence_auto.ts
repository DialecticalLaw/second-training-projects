import { app } from '../..';
import { MoveAction, Round } from '../../interfaces';
import AppView from '../view/app_view';
import clearSourcesValidity from './clear_sources_validity';
import { updateButtonsState } from './updateButtons';

function findSource(word: string): HTMLDivElement {
  const allSources: HTMLDivElement[] = Array.from(
    document.querySelectorAll('.playarea__source_active')
  );
  const result: HTMLDivElement | undefined = allSources.find(
    (source: HTMLDivElement): boolean =>
      source.textContent === word && !source.classList.contains('tagged')
  );
  if (result) return result;
  throw new Error('Source not found at findSource (Model.ts)');
}

export default function completeSentenceAuto(): void {
  if (
    app.model.sentenceIndex === undefined ||
    app.model.roundIndex === undefined ||
    app.model.currentLevel === undefined
  )
    throw new Error('sentenceIndex or roundIndex is undefined');
  const actionBtn = document.querySelector('.playarea__action-button') as HTMLButtonElement;
  AppView.disableElemsOnTime([actionBtn], 400);

  const round: Round = app.model.currentLevel.rounds[app.model.roundIndex];
  const exampleSentence: string[] = round.words[app.model.sentenceIndex].textExample.split(' ');

  const allSentencePlaces: HTMLDivElement[] = Array.from(
    document.querySelectorAll('.playarea__sentence-place_active')
  );

  const allSources: HTMLDivElement[] = Array.from(
    document.querySelectorAll('.playarea__source_active')
  );

  allSentencePlaces.forEach((place: HTMLDivElement, index: number): void => {
    const exampleWord = exampleSentence[index];
    const source: HTMLDivElement = findSource(exampleWord);
    source.classList.add('tagged');
    AppView.moveComponent(source, MoveAction.SetSource, place);
    clearSourcesValidity();
    updateButtonsState();
  });

  allSources.forEach((source: HTMLDivElement): void => {
    source.classList.remove('tagged');
  });
}
