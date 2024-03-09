import './main_page_style.css';
import { MainPageWrappers } from '../../../../interfaces';
import createElem from '../../../utils/create_elem';
import appendElem from '../../../utils/appendElem';
import { app } from '../../../..';

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
    words.forEach((word: string) => {
      const source = createElem('div', { class: 'playarea__source' });
      source.textContent = word;
      appendElem(this.sourcesWrapper, [source]);
    });
    app.handleActionRequest('startGame');
  }

  public static moveSource(source: HTMLDivElement): void {
    const currentSentence = [
      ...document.querySelectorAll('.playarea__sentence')
    ][0] as HTMLDivElement;
    appendElem(currentSentence, [source]);
  }
}
