import './main_page_style.css';
import createElem from '../../../utils/create_elem';
import appendElem from '../../../utils/appendElem';
import { app } from '../../../..';
import shuffleArr from '../../../utils/shuffleArr';
import {
  CompletedRounds,
  Levels,
  LevelsRoundsCount,
  PlayboardSize,
  PuzzleInfo
} from '../../../../interfaces';
import AppView from '../../app_view';

export default class MainPageView {
  private playareaWrapper: HTMLDivElement;

  private optionsWrapper: HTMLDivElement;

  private hintsOptionsWrapper: HTMLDivElement;

  private selectOptionsWrapper: HTMLDivElement;

  private puzzleWrapper: HTMLDivElement;

  private sourcesWrapper: HTMLDivElement;

  private buttonsWrapper: HTMLDivElement;

  constructor() {
    const [
      playareaWrapper,
      optionsWrapper,
      hintsOptionsWrapper,
      selectOptionsWrapper,
      puzzleWrapper,
      sourcesWrapper,
      buttonsWrapper
    ]: HTMLDivElement[] = MainPageView.createMainPageWrappers();

    this.playareaWrapper = playareaWrapper;
    this.optionsWrapper = optionsWrapper;
    this.hintsOptionsWrapper = hintsOptionsWrapper;
    this.selectOptionsWrapper = selectOptionsWrapper;
    this.puzzleWrapper = puzzleWrapper;
    this.sourcesWrapper = sourcesWrapper;
    this.buttonsWrapper = buttonsWrapper;
  }

  public draw(roundsCount: number) {
    this.drawWrappers();
    this.drawMainElems(roundsCount);
    app.handleActionRequest('startGame');
    app.handleActionRequest('check');
  }

  private drawWrappers(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    if (main) {
      appendElem(main, [this.playareaWrapper]);
    }

    appendElem(this.playareaWrapper, [
      this.optionsWrapper,
      this.puzzleWrapper,
      this.sourcesWrapper,
      this.buttonsWrapper
    ]);
    appendElem(this.optionsWrapper, [this.hintsOptionsWrapper, this.selectOptionsWrapper]);
  }

  private drawMainElems(roundsCount: number): void {
    this.drawHintsOptions();
    this.drawSelectOptions(roundsCount);
    this.drawSentences();

    const imageDescription: HTMLParagraphElement = createElem<HTMLParagraphElement>('p', {
      class: 'playarea__image-description'
    });
    appendElem(this.sourcesWrapper, [imageDescription]);

    this.drawButtons();
  }

  public static markCompletedLevels(
    completedRounds: CompletedRounds,
    levelsRoundsCount: LevelsRoundsCount
  ): void {
    const levelsCount = 6;
    for (let i = 1; i <= levelsCount; i += 1) {
      const level = `level${i}` as Levels;
      const currentLevel: number[] = completedRounds[level];
      if (currentLevel.length === levelsRoundsCount[level]) {
        const levelOption: HTMLOptionElement | null = document.querySelector(
          `.playarea__select-level_option[value="${i}"]`
        );
        if (levelOption) AppView.switchComponentDisplay(levelOption, 'validity', { isValid: true });
      }
    }
  }

  public static markCompletedRounds(completedRounds: CompletedRounds, currentLevel: Levels): void {
    for (let i = 0; i < completedRounds[currentLevel].length; i += 1) {
      const roundOption: HTMLOptionElement | null = document.querySelector(
        `.playarea__select-round_option[value="${completedRounds[currentLevel][i]}"]`
      );

      if (roundOption) AppView.switchComponentDisplay(roundOption, 'validity', { isValid: true });
    }
  }

  private drawSentences(): void {
    const sentences: HTMLDivElement[] = [];
    for (let i = 0; i < 10; i += 1) {
      // 10 - count of sentences
      const sentence: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__sentence'
      });
      sentences.push(sentence);
    }
    appendElem(this.puzzleWrapper, sentences);
  }

  private drawButtons(): void {
    const actionBtn: HTMLDivElement = createElem<HTMLDivElement>('button', {
      class: 'playarea__action-button'
    });
    actionBtn.textContent = 'Check';
    const autoCompleteBtn: HTMLDivElement = createElem<HTMLDivElement>('button', {
      class: 'playarea__auto-complete valid'
    });
    autoCompleteBtn.textContent = 'Auto-complete';
    appendElem(this.buttonsWrapper, [actionBtn, autoCompleteBtn]);
  }

  private drawHintsOptions(): void {
    const translateBtn: HTMLButtonElement = createElem<HTMLButtonElement>('button', {
      class: 'playarea__translate-hint valid'
    });
    const audioBtn: HTMLButtonElement = createElem<HTMLButtonElement>('button', {
      class: 'playarea__audio-hint valid'
    });
    const backgroundBtn: HTMLButtonElement = createElem<HTMLButtonElement>('button', {
      class: 'playarea__background-hint valid'
    });
    appendElem(this.hintsOptionsWrapper, [translateBtn, audioBtn, backgroundBtn]);

    const translateText: HTMLParagraphElement = createElem<HTMLParagraphElement>('p', {
      class: 'playarea__translate-text valid'
    });
    const audioIcon: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__audio-icon valid'
    });
    const audio: HTMLAudioElement = createElem<HTMLAudioElement>('audio', {
      class: 'playarea__audio'
    });

    const hintsWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__hints-wrapper'
    });
    appendElem(hintsWrapper, [translateText, audioIcon, audio]);
    this.optionsWrapper.insertAdjacentElement('afterend', hintsWrapper);
  }

  private drawSelectOptions(roundsCount: number): void {
    this.drawLevelSelect();
    this.drawRoundSelect(roundsCount);
  }

  private drawLevelSelect(): void {
    const form: HTMLFormElement = createElem<HTMLFormElement>('form', {
      class: 'playarea__level-select_form'
    });
    const label: HTMLLabelElement = createElem<HTMLLabelElement>('label', {
      class: 'playarea__select-level_label',
      for: 'level-select'
    });
    label.textContent = 'Level:';
    const selectElem: HTMLSelectElement = createElem<HTMLSelectElement>('select', {
      class: 'playarea__select-level',
      id: 'level-select'
    });
    appendElem(form, [label, selectElem]);

    const levelsCount: number = 6;
    for (let i = 1; i <= levelsCount; i += 1) {
      const option: HTMLOptionElement = createElem<HTMLOptionElement>('option', {
        class: 'playarea__select-level_option',
        value: `${i}`
      });
      option.textContent = `Level ${i}`;
      appendElem(selectElem, [option]);
    }

    appendElem(this.selectOptionsWrapper, [form]);
  }

  private drawRoundSelect(roundsCount: number): void {
    const form: HTMLFormElement = createElem<HTMLFormElement>('form', {
      class: 'playarea__round-select_form'
    });
    const label: HTMLLabelElement = createElem<HTMLLabelElement>('label', {
      class: 'playarea__select-round_label',
      for: 'round-select'
    });
    label.textContent = 'Round:';
    const selectElem: HTMLSelectElement = createElem<HTMLSelectElement>('select', {
      class: 'playarea__select-round',
      id: 'round-select'
    });
    appendElem(form, [label, selectElem]);

    for (let i = 1; i <= roundsCount; i += 1) {
      const option: HTMLOptionElement = createElem<HTMLOptionElement>('option', {
        class: 'playarea__select-round_option',
        value: `${i - 1}` // round index
      });
      option.textContent = `Round ${i}`;
      appendElem(selectElem, [option]);
    }

    appendElem(this.selectOptionsWrapper, [form]);
  }

  private static createMainPageWrappers(): HTMLDivElement[] {
    const playareaWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea'
    });

    const optionsWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__options'
    });

    const hintsOptionsWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__options_hints'
    });

    const selectOptionsWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__options_select'
    });

    const puzzleWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__puzzles'
    });

    const sourcesWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__sources'
    });

    const buttonsWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__buttons'
    });

    return [
      playareaWrapper,
      optionsWrapper,
      hintsOptionsWrapper,
      selectOptionsWrapper,
      puzzleWrapper,
      sourcesWrapper,
      buttonsWrapper
    ];
  }

  public drawSources(words: PuzzleInfo[], imageSrc: string, row: number): void {
    const shuffledSentence: PuzzleInfo[] = shuffleArr(words);
    this.createSourcesPlaces(words.length);
    MainPageView.createSources(shuffledSentence);
    MainPageView.drawSourcesBackground(words, imageSrc, row);

    const allSources: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source_active')
    );
    MainPageView.setWidth(allSources);

    const allSourcePlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source-place')
    );

    allSourcePlaces.forEach((place: HTMLDivElement): void => {
      const placeLink = place;
      placeLink.style.width = 'max-content';
      const source = place.firstElementChild as HTMLDivElement | null;

      if (source) {
        source.style.transform = 'scale(0)';
        source.style.removeProperty('opacity');
        setTimeout(() => {
          source.style.removeProperty('transition');
          source.style.removeProperty('transform');
        }, 1);
      }
    });
  }

  private static drawSourcesBackground(words: PuzzleInfo[], imageSrc: string, row: number): void {
    const allActiveSources: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source_active')
    );

    let positionX: number = 0;
    words.forEach((word: PuzzleInfo) => {
      const currentSource: HTMLDivElement | undefined = allActiveSources.find(
        (source: HTMLDivElement) =>
          source.textContent === word.word && !source.classList.contains('marked')
      );
      if (!currentSource) throw new Error('source not found');
      const sourceImg = currentSource.firstElementChild as HTMLDivElement;
      currentSource.classList.add('marked');
      sourceImg.style.backgroundImage = `url('pictures/${imageSrc}')`;

      const playareaPuzzles = document.querySelector('.playarea__puzzles') as HTMLDivElement;
      const playboardSize: PlayboardSize = {
        width: playareaPuzzles.getBoundingClientRect().width,
        height: playareaPuzzles.getBoundingClientRect().height
      };
      sourceImg.style.backgroundSize = `${playboardSize.width}px ${playboardSize.height}px`;

      const sourcesHeight: number = currentSource.getBoundingClientRect().height;
      const positionY = row * sourcesHeight;
      sourceImg.style.backgroundPosition = `-${positionX}px -${positionY}px`;
      positionX += currentSource.getBoundingClientRect().width;

      MainPageView.drawPegBackground(currentSource, imageSrc, positionX, positionY, playboardSize);
    });
    allActiveSources.forEach((source: HTMLDivElement) => source.classList.remove('marked'));
  }

  private static drawPegBackground(
    source: HTMLDivElement,
    imageSrc: string,
    positionX: number,
    positionY: number,
    playboardSize: PlayboardSize
  ): void {
    const peg = source.lastElementChild as HTMLDivElement;
    if (!peg.classList.contains('playarea__peg_outer')) return;

    peg.style.backgroundImage = `url('pictures/${imageSrc}')`;
    peg.style.backgroundSize = `${playboardSize.width}px ${playboardSize.height}px`;
    const pegSize: number = peg.getBoundingClientRect().width;

    const pegPositionY = positionY + (source.getBoundingClientRect().height - pegSize) / 2;
    peg.style.backgroundPosition = `-${positionX - 2}px -${pegPositionY}px`;
  }

  private createSourcesPlaces(placesCount: number): void {
    for (let i = 0; i < placesCount; i += 1) {
      const sourcePlace: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__source-place'
      });
      appendElem(this.sourcesWrapper, [sourcePlace]);
    }
  }

  private static createSources(shuffledWords: PuzzleInfo[]): void {
    const allSourcesPlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source-place')
    );
    shuffledWords.forEach((puzzleInfo: PuzzleInfo, index: number) => {
      const source: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: `playarea__source playarea__source_active ${puzzleInfo.puzzleType}`,
        id: `source${index}`,
        style: 'transition: 0s; opacity: 0',
        draggable: 'true'
      });

      const sourceImg: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__source-img'
      });
      const sourceText: HTMLSpanElement = createElem<HTMLSpanElement>('span', {
        class: 'playarea__source-text'
      });
      sourceText.textContent = puzzleInfo.word;
      appendElem(source, [sourceImg, sourceText]);

      MainPageView.drawSourcePeg(source, puzzleInfo);
      appendElem(allSourcesPlaces[index], [source]);
    });
  }

  private static drawSourcePeg(source: HTMLDivElement, puzzleInfo: PuzzleInfo): void {
    if (puzzleInfo.puzzleType === 'start') {
      const pegOuter: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__peg_outer'
      });
      appendElem(source, [pegOuter]);
    } else if (puzzleInfo.puzzleType === 'middle') {
      const pegInner: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__peg_inner'
      });
      const pegOuter: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__peg_outer'
      });
      appendElem(source, [pegInner, pegOuter]);
    } else {
      const pegInner: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__peg_inner'
      });
      appendElem(source, [pegInner]);
    }
  }

  private static setWidth<T extends HTMLElement>(elems: T[]): void {
    elems.forEach((elem: HTMLElement): void => {
      const sourceLink = elem;
      sourceLink.style.width = `${elem.getBoundingClientRect().width}px`;
    });
  }

  public static drawSourcesPlaceInSentence(placeCount: number, sentenceIndex: number): void {
    const sentences: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__sentence')
    );
    const currentSentenceElem: HTMLDivElement = sentences[sentenceIndex];

    for (let i = 0; i < placeCount; i += 1) {
      const sourcePlace: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__sentence-place playarea__sentence-place_active'
      });
      appendElem(currentSentenceElem, [sourcePlace]);
    }
    app.handleActionRequest('sourcesAppear');
  }

  public static moveSource(source: HTMLDivElement): void {
    const sourceParent: HTMLElement | null = source.parentElement;
    if (sourceParent) {
      sourceParent.removeAttribute('style');

      if (sourceParent.classList.contains('playarea__source-place')) {
        const allSentencePlaces: HTMLDivElement[] = Array.from(
          document.querySelectorAll('.playarea__sentence-place_active')
        );
        const vacantPlace: HTMLDivElement | undefined = allSentencePlaces.find(
          (place: HTMLDivElement) => !place.children.length
        );

        if (vacantPlace) {
          vacantPlace.style.width = 'max-content';
          appendElem(vacantPlace, [source]);
        }
      } else {
        const allSourcePlaces: HTMLDivElement[] = Array.from(
          document.querySelectorAll('.playarea__source-place')
        );
        const vacantPlace: HTMLDivElement | undefined = allSourcePlaces.find(
          (place: HTMLDivElement) => !place.children.length
        );

        if (vacantPlace) {
          vacantPlace.style.width = 'max-content';
          appendElem(vacantPlace, [source]);
        }
      }
    }
  }

  public static setSource<T extends HTMLElement>(target: T, source: T): void {
    const sourceParent: HTMLElement | null = source.parentElement;
    if (sourceParent) {
      sourceParent.removeAttribute('style');
      const targetLink = target;
      targetLink.style.width = 'max-content';
      appendElem(target, [source]);
    }
  }

  public static updateTranslateText(hint: string): void {
    const translateText: HTMLParagraphElement | null = document.querySelector(
      '.playarea__translate-text'
    );
    if (translateText) {
      translateText.textContent = hint;
    }
  }

  public static toggleSourcesBackground<T extends HTMLElement>(elem: T, imageSrc: string): void {
    const elemLink = elem;

    if (imageSrc === 'hide') {
      elem.style.removeProperty('background-image');
      elem.classList.add('invisible-background');
    } else {
      elemLink.style.backgroundImage = `url('pictures/${imageSrc}')`;
      elem.classList.remove('invisible-background');
    }
  }
}
