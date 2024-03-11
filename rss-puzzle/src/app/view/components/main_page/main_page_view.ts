import './main_page_style.css';
import createElem from '../../../utils/create_elem';
import appendElem from '../../../utils/appendElem';
import { app } from '../../../..';
import shuffleArr from '../../../utils/shuffleArr';

export default class MainPageView {
  private playareaWrapper: HTMLDivElement;

  private puzzleWrapper: HTMLDivElement;

  private sourcesWrapper: HTMLDivElement;

  private buttonsWrapper: HTMLDivElement;

  constructor() {
    const [playareaWrapper, puzzleWrapper, sourcesWrapper, buttonsWrapper]: HTMLDivElement[] =
      MainPageView.createMainPageWrappers();
    this.playareaWrapper = playareaWrapper;
    this.puzzleWrapper = puzzleWrapper;
    this.sourcesWrapper = sourcesWrapper;
    this.buttonsWrapper = buttonsWrapper;
  }

  public draw() {
    this.drawWrappers();
    this.drawMainElems();
  }

  private drawWrappers(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    if (main) {
      appendElem(main, [this.playareaWrapper]);
    }
    appendElem(this.playareaWrapper, [
      this.puzzleWrapper,
      this.sourcesWrapper,
      this.buttonsWrapper
    ]);
  }

  private drawMainElems(): void {
    const sentences: HTMLDivElement[] = [];
    for (let i = 0; i < 10; i += 1) {
      // 10 - count of sentences
      const sentence: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__sentence'
      });
      sentences.push(sentence);
    }
    appendElem(this.puzzleWrapper, sentences);
    const continueBtn: HTMLDivElement = createElem<HTMLDivElement>('button', {
      class: 'playarea__continue-button'
    });
    continueBtn.textContent = 'Continue';
    appendElem(this.buttonsWrapper, [continueBtn]);
  }

  private static createMainPageWrappers(): HTMLDivElement[] {
    const playareaWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea'
    });
    const puzzleWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__puzzles'
    });
    const sourcesWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__sources'
    });
    const buttonsWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__buttons-wrapper'
    });
    return [playareaWrapper, puzzleWrapper, sourcesWrapper, buttonsWrapper];
  }

  public drawSources(words: string[]): void {
    const shuffledSentence: string[] = shuffleArr(words);
    shuffledSentence.forEach((word: string) => {
      const source: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__source playarea__source_active',
        style: 'transition: 0s; opacity: 0'
      });
      source.textContent = word;
      const sourcePlace: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__source-place'
      });
      appendElem(this.sourcesWrapper, [sourcePlace]);
      appendElem(sourcePlace, [source]);
    });
    const allSources = [
      ...document.querySelectorAll('.playarea__source_active')
    ] as HTMLDivElement[];
    allSources.forEach((source: HTMLDivElement): void => {
      const sourceLink = source;
      sourceLink.style.width = `${source.getBoundingClientRect().width}px`;
    });
    const allSourcePlaces = [
      ...document.querySelectorAll('.playarea__source-place')
    ] as HTMLDivElement[];
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
    app.handleActionRequest('startGame');
  }

  public static drawSourcesPlaceInSentence(placeCount: number, sentenceIndex: number): void {
    const currentSentenceElem = [...document.querySelectorAll('.playarea__sentence')][
      sentenceIndex
    ] as HTMLDivElement;
    for (let i = 0; i < placeCount; i += 1) {
      const sourcePlace: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__sentence-place playarea__sentence-place_active'
      });
      appendElem(currentSentenceElem, [sourcePlace]);
    }
  }

  public static moveSourceOnClick(source: HTMLDivElement): void {
    const sourceParent: HTMLElement | null = source.parentElement;
    if (sourceParent) {
      sourceParent.removeAttribute('style');
      if (sourceParent.classList.contains('playarea__source-place')) {
        const allSentencePlaces = [
          ...document.querySelectorAll('.playarea__sentence-place_active')
        ] as HTMLDivElement[];
        const vacantPlace = allSentencePlaces.find(
          (place: HTMLDivElement) => !place.children.length
        ) as HTMLDivElement;
        vacantPlace.style.width = 'max-content';
        appendElem(vacantPlace, [source]);
      } else {
        const allSourcePlaces = [
          ...document.querySelectorAll('.playarea__source-place')
        ] as HTMLDivElement[];
        const vacantPlace = allSourcePlaces.find(
          (place: HTMLDivElement) => !place.children.length
        ) as HTMLDivElement;
        vacantPlace.style.width = 'max-content';
        appendElem(vacantPlace, [source]);
      }
    }
  }
}
