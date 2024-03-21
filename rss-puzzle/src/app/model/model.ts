import LocalStorageService from '../services/local_storage_service';
import AppView from '../view/app_view';
import wordCollectionLevel1 from '../data/wordCollection/wordCollectionLevel1.json';
import wordCollectionLevel2 from '../data/wordCollection/wordCollectionLevel2.json';
import wordCollectionLevel3 from '../data/wordCollection/wordCollectionLevel3.json';
import wordCollectionLevel4 from '../data/wordCollection/wordCollectionLevel4.json';
import wordCollectionLevel5 from '../data/wordCollection/wordCollectionLevel5.json';
import wordCollectionLevel6 from '../data/wordCollection/wordCollectionLevel6.json';
import {
  ChangeType,
  CompletedRound,
  CompletedRounds,
  ComponentName,
  Level,
  Levels,
  LevelsRoundsCount,
  PuzzleInfo,
  Round,
  Sentence
} from '../../interfaces';
import definePuzzlesInfo from './define_puzzles_info';
import { updateButtonsOnShowImage, updateButtonsOnStepForward } from './updateButtons';
import disableActiveElems from './disable_active_elems';
import { initHintsAccordingSavedData } from './hints';

export default class Model {
  public appView: AppView;

  public localStorageService: LocalStorageService;

  public currentLevel?: Level;

  public roundIndex?: number;

  public levelNumber?: number;

  public sentenceIndex?: number;

  private translateHint?: string;

  public levelsRoundsCount: LevelsRoundsCount;

  private isImageShowed?: boolean;

  constructor() {
    this.appView = new AppView();
    this.localStorageService = new LocalStorageService();
    this.levelsRoundsCount = {
      level1: wordCollectionLevel1.roundsCount,
      level2: wordCollectionLevel2.roundsCount,
      level3: wordCollectionLevel3.roundsCount,
      level4: wordCollectionLevel4.roundsCount,
      level5: wordCollectionLevel5.roundsCount,
      level6: wordCollectionLevel6.roundsCount
    };
  }

  public initiate(): void {
    AppView.drawBasicMarkup();
    if (!this.localStorageService.isLocalStorageInit()) {
      this.localStorageService.initLocalStorage();
      this.appView.displayComponent(ComponentName.LoginPage);
    } else {
      this.appView.displayComponent(ComponentName.StartPage);
    }
  }

  public nextSentence(isInit?: boolean): void {
    if (this.sentenceIndex === undefined) {
      this.sentenceIndex = 0;
    }

    if (this.currentLevel !== undefined && this.roundIndex !== undefined) {
      const round: Round = this.currentLevel.rounds[this.roundIndex];
      const currentSentenceInfo: Sentence = round.words[this.sentenceIndex];
      this.translateHint = currentSentenceInfo.textExampleTranslate;

      const translateText: HTMLParagraphElement | null = document.querySelector(
        '.playarea__translate-text'
      );
      const audioElem: HTMLAudioElement | null = document.querySelector('.playarea__audio');
      const audioPath: string = currentSentenceInfo.audioExample;
      const audioLink = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioPath}`;
      if (translateText && audioElem) {
        audioElem.src = audioLink;
        AppView.switchComponentDisplay(translateText, ChangeType.UpdateHint, {
          hint: this.translateHint
        });
      }

      const sentence: string[] = currentSentenceInfo.textExample.split(' ');
      const puzzlesInfo: PuzzleInfo[] = definePuzzlesInfo(sentence);
      const imageSrc: string = round.levelData.imageSrc;

      this.appView.displayComponent(ComponentName.SourceWords, {
        puzzlesInfo: puzzlesInfo,
        imageSrc,
        sentenceIndex: this.sentenceIndex
      });
    }

    if (isInit) initHintsAccordingSavedData();
  }

  public stepForward(): void {
    disableActiveElems();
    if (this.sentenceIndex === undefined) throw new Error('sentenceIndex is undefined');
    const allSourcePlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source-place')
    );

    if (this.sentenceIndex < 9) {
      // next sentence
      this.isImageShowed = false;
      this.sentenceIndex += 1;
      AppView.removeComponent(allSourcePlaces);
      this.nextSentence();
      updateButtonsOnStepForward();
    } else {
      // show image or next round
      if (!this.isImageShowed) {
        this.showImage();
        return;
      }
      this.isImageShowed = false;
      Model.removeImageDescription();
      this.saveCompletedRound();
      this.updateRoundsMarked();
      this.updateRoundIndex();

      const allSentencePlaces: HTMLDivElement[] = Array.from(
        document.querySelectorAll('.playarea__sentence-place')
      );
      AppView.removeComponent([...allSentencePlaces, ...allSourcePlaces]);
      this.sentenceIndex = 0;

      setTimeout((): void => {
        this.nextSentence();
        updateButtonsOnStepForward();
      }, 600);
    }
  }

  public showImage(): void {
    this.isImageShowed = true;

    AppView.showImage();
    if (this.currentLevel && this.roundIndex !== undefined) {
      const round: Round = this.currentLevel.rounds[this.roundIndex];
      AppView.showImageDescription(
        round.levelData.author,
        round.levelData.name,
        round.levelData.year
      );
    }
    updateButtonsOnShowImage();
  }

  private static removeImageDescription(): void {
    const imageDescription: HTMLParagraphElement | null = document.querySelector(
      '.playarea__image-description'
    );
    if (imageDescription) {
      AppView.switchComponentDisplay(imageDescription, ChangeType.Validity, { isValid: false });
    }
  }

  public updateRoundIndex(): void {
    if (!this.levelNumber || !this.currentLevel || this.roundIndex === undefined) return;
    if (this.roundIndex + 1 === this.currentLevel.roundsCount) {
      if (this.levelNumber === 6) {
        this.levelNumber = 1;
        this.currentLevel = wordCollectionLevel1;
      } else {
        this.levelNumber += 1;
      }
      this.roundIndex = 0;
      this.updateCurrentLevel();
    } else {
      this.roundIndex += 1;
    }

    AppView.updateSelectedOptions(this.levelNumber, this.roundIndex);
  }

  public updateCurrentLevel(): void {
    if (!this.levelNumber) return;
    switch (this.levelNumber) {
      case 1:
        this.currentLevel = wordCollectionLevel1;
        break;
      case 2:
        this.currentLevel = wordCollectionLevel2;
        break;
      case 3:
        this.currentLevel = wordCollectionLevel3;
        break;
      case 4:
        this.currentLevel = wordCollectionLevel4;
        break;
      case 5:
        this.currentLevel = wordCollectionLevel5;
        break;
      case 6:
        this.currentLevel = wordCollectionLevel6;
        break;

      default:
        break;
    }
  }

  private saveCompletedRound(): void {
    if (this.roundIndex !== undefined && this.levelNumber !== undefined) {
      const currectRoundIndex: number = this.roundIndex;
      const currentLevel = `level${this.levelNumber.toString()}` as Levels;
      const completedRound: CompletedRound = {
        level: currentLevel,
        round: currectRoundIndex
      };
      this.localStorageService.updateCompletedRounds(completedRound);
      this.localStorageService.saveLastRound(completedRound);
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
          AppView.switchComponentDisplay(source, ChangeType.Validity, { isValid: true });
        } else {
          AppView.switchComponentDisplay(source, ChangeType.Validity, { isValid: false });
        }
      });
    }
  }

  public changeLevel(event: Event): void {
    if (!event.currentTarget || !this.currentLevel) return;
    const eventTarget = event.currentTarget as HTMLSelectElement;
    const selectedLevel: string = eventTarget.value;
    this.levelNumber = Number(selectedLevel);
    this.updateCurrentLevel();

    AppView.updateRoundsList(this.currentLevel.roundsCount);
    this.updateRoundsMarked();
    this.roundIndex = 0;
    this.changeRound('not-event');
  }

  private updateRoundsMarked(): void {
    const completedRounds: CompletedRounds = this.localStorageService.getData('completedRounds');
    const currentLevel = `level${this.levelNumber}` as Levels;
    AppView.markCompleted({
      completedRounds,
      levelsRoundsCount: this.levelsRoundsCount,
      currentLevel
    });
  }

  public changeRound(event: Event | 'not-event'): void {
    const allSourcePlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source-place')
    );
    const allSentencePlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__sentence-place')
    );

    this.sentenceIndex = 0;

    if (event instanceof Event && event.currentTarget) {
      const eventTarget = event.currentTarget as HTMLSelectElement;
      const selectedRound: string = eventTarget.value;
      this.roundIndex = Number(selectedRound);
    }

    AppView.removeComponent([...allSourcePlaces, ...allSentencePlaces]);
    setTimeout((): void => {
      this.nextSentence();
      Model.removeImageDescription();
      updateButtonsOnStepForward();
    }, 600);
  }
}
