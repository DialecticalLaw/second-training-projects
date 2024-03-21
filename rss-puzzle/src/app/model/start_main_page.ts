import { app } from '../..';
import { CompletedRound, CompletedRounds, ComponentName, Levels } from '../../interfaces';
import AppView from '../view/app_view';

export default function startMainPage(): void {
  const startContent = document.querySelector('.start-content') as HTMLDivElement;
  AppView.removeComponent([startContent]);
  const lastCompletedRound: CompletedRound = app.model.localStorageService.getData('lastRound');
  app.model.levelNumber = Number(lastCompletedRound.level.slice(-1));
  app.model.roundIndex = lastCompletedRound.round;
  app.model.updateCurrentLevel();
  if (!app.model.currentLevel) return;

  const completedRounds: CompletedRounds = app.model.localStorageService.getData('completedRounds');
  const currentLevel = `level${app.model.levelNumber}` as Levels;

  app.model.appView.displayComponent(ComponentName.MainPage, {
    roundsCount: app.model.currentLevel.roundsCount,
    infoForMark: {
      completedRounds,
      levelsRoundsCount: app.model.levelsRoundsCount,
      currentLevel
    }
  });

  AppView.updateSelectedOptions(app.model.levelNumber, app.model.roundIndex);
  app.model.updateRoundIndex();
  app.model.nextSentence(true);
}
