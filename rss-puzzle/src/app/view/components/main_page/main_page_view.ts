import './main_page_style.css';
import { MainPageWrappers } from '../../../../interfaces';
import createElem from '../../../utils/create_elem';
import appendElem from '../../../utils/appendElem';
import { app } from '../../../..';
import shuffleArr from '../../../utils/shuffleArr';

export default class MainPageView {
  private playareaWrapper: HTMLDivElement;

  private puzzleWrapper: HTMLDivElement;

  private sourcesWrapper: HTMLDivElement;

  constructor() {
    const [playareaWrapper, puzzleWrapper, sourcesWrapper]: MainPageWrappers =
      MainPageView.createMainPageWrappers();
    this.playareaWrapper = playareaWrapper;
    this.puzzleWrapper = puzzleWrapper;
    this.sourcesWrapper = sourcesWrapper;
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
    appendElem(this.playareaWrapper, [this.puzzleWrapper, this.sourcesWrapper]);
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
  }

  private static createMainPageWrappers(): MainPageWrappers {
    const playareaWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea'
    });
    const puzzleWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__puzzles'
    });
    const sourcesWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'playarea__sources'
    });
    return [playareaWrapper, puzzleWrapper, sourcesWrapper];
  }

  public drawSources(words: string[]): void {
    const shuffledSentence: string[] = shuffleArr(words);
    shuffledSentence.forEach((word: string) => {
      const source: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__source playarea__source_active'
      });
      source.textContent = word;
      appendElem(this.sourcesWrapper, [source]);
    });
    const allSources = [
      ...document.querySelectorAll('.playarea__source_active')
    ] as HTMLDivElement[];
    allSources.forEach((source: HTMLDivElement) => {
      const sourceLink = source;
      sourceLink.style.width = `${source.getBoundingClientRect().width}px`;
    });
    MainPageView.drawSourcesPlace(words.length);
    app.handleActionRequest('startGame');
  }

  private static drawSourcesPlace(placeCount: number): void {
    const currentSentenceElem = [
      ...document.querySelectorAll('.playarea__sentence')
    ][0] as HTMLDivElement;
    for (let i = 0; i < placeCount; i += 1) {
      const sourcePlace: HTMLDivElement = createElem<HTMLDivElement>('div', {
        class: 'playarea__source-place playarea__source-place_active'
      });
      appendElem(currentSentenceElem, [sourcePlace]);
    }
  }

  public static moveSource(source: HTMLDivElement): void {
    const allPlaces = [
      ...document.querySelectorAll('.playarea__source-place_active')
    ] as HTMLDivElement[];
    const vacantPlace = allPlaces.find(
      (place: HTMLDivElement) => !place.children.length
    ) as HTMLDivElement;
    appendElem(vacantPlace, [source]);
  }
}
