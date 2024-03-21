import { app } from '../..';
import { PlayboardSize, Round } from '../../interfaces';
import AppView from '../view/app_view';

let isWidthLarge: boolean;

export default function resizeSources(isNeedRecalculate?: boolean): void {
  const someSource = document.querySelector('.playarea__source') as HTMLDivElement;
  const body = document.querySelector('body') as HTMLBodyElement;
  const pageWidth = body.clientWidth;
  const playareaSourcesWrapper = document.querySelector('.playarea__sources') as HTMLDivElement;
  const playareaPuzzles = document.querySelector('.playarea__puzzles') as HTMLDivElement;

  if (pageWidth < 1180 || isNeedRecalculate) {
    if (isWidthLarge && !isNeedRecalculate) isWidthLarge = false;
    if (!isNeedRecalculate) {
      playareaSourcesWrapper.style.width = `${pageWidth - 30}px`;
      playareaPuzzles.style.width = `${pageWidth - 30}px`;
    }

    const playboardSize: PlayboardSize = {
      width: playareaPuzzles.getBoundingClientRect().width,
      height: playareaPuzzles.getBoundingClientRect().height
    };
    const sourceHeight: number = someSource.getBoundingClientRect().height;

    AppView.reassignSourcesWidth();
    if (app.model.currentLevel && app.model.roundIndex !== undefined) {
      const round: Round = app.model.currentLevel.rounds[app.model.roundIndex];
      AppView.updateSourcesSize(playboardSize, sourceHeight, round, isNeedRecalculate);
    }
  } else if (playareaSourcesWrapper && playareaPuzzles) {
    if (!isWidthLarge) {
      resizeSources(true);
      isWidthLarge = true;
    }
    playareaSourcesWrapper.removeAttribute('style');
    playareaPuzzles.removeAttribute('style');
  }
}
