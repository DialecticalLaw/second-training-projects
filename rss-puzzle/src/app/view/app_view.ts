import LoginPageView from './components/login_page/login_page_view';
import StartPageView from './components/start_page/start_page_view';
import createElem from '../utils/create_elem';
import appendElem from '../utils/append_elem';
import MainPageView from './components/main_page/main_page_view';
import {
  ChangeType,
  ComponentName,
  DisplayOptions,
  HandleAction,
  HintsStatus,
  InfoForMark,
  MoveAction,
  PlayboardSize,
  Round,
  SwitchOptions
} from '../../interfaces';
import { app } from '../..';

export default class AppView {
  private loginPageView: LoginPageView;

  private startPageView: StartPageView;

  private mainPageView: MainPageView;

  constructor() {
    this.loginPageView = new LoginPageView();
    this.startPageView = new StartPageView();
    this.mainPageView = new MainPageView();
  }

  public displayComponent(componentName: ComponentName, options?: DisplayOptions): void {
    switch (componentName) {
      case ComponentName.LoginPage:
        this.loginPageView.draw();
        break;
      case ComponentName.StartPage:
        this.startPageView.draw();
        break;
      case ComponentName.MainPage:
        if (options && options.infoForMark && options.roundsCount) {
          this.mainPageView.draw(options.roundsCount);
          AppView.markCompleted(options.infoForMark);
        }
        break;
      case ComponentName.SourceWords:
        if (
          options !== undefined &&
          options.puzzlesInfo &&
          options.sentenceIndex !== undefined &&
          options.imageSrc
        ) {
          this.mainPageView.drawSources(
            options.puzzlesInfo,
            options.imageSrc,
            options.sentenceIndex
          );
          MainPageView.drawSourcesPlaceInSentence(
            options.puzzlesInfo.length,
            options.sentenceIndex
          );
        }
        break;
      default:
        break;
    }
  }

  public static markCompleted(infoForMark: InfoForMark): void {
    MainPageView.markCompletedLevels(infoForMark.completedRounds, infoForMark.levelsRoundsCount);
    MainPageView.markCompletedRounds(infoForMark.completedRounds, infoForMark.currentLevel);
  }

  public static async removeComponent<T extends HTMLElement>(components: T[]): Promise<void> {
    const actionBtn = document.querySelector('.playarea__action-button') as HTMLButtonElement;
    const selectLevelForm = document.querySelector(
      '.playarea__level-select_form'
    ) as HTMLFormElement;
    const selectRoundForm = document.querySelector(
      '.playarea__round-select_form'
    ) as HTMLFormElement;
    const logoutBtn = document.querySelector('.logout') as HTMLDivElement;

    let isDisabled = false;
    components.forEach((component: T): void => {
      if (component.classList.contains('playarea__sentence-place')) {
        if (!isDisabled) {
          AppView.disableElemsOnTime([actionBtn, selectLevelForm, selectRoundForm, logoutBtn], 600);
          isDisabled = true;
        }

        const componentLink = component;
        const translateSpread: number = 250;
        const x =
          Math.floor(Math.random() * (translateSpread - -translateSpread + 1)) + -translateSpread;
        const y =
          Math.floor(Math.random() * (translateSpread - -translateSpread + 1)) + -translateSpread;
        componentLink.style.transform = `translateX(${x}%) translateY(${y}%)`;
        componentLink.style.opacity = '0';

        setTimeout((): void => {
          component.replaceChildren(); // === remove all children
          component.remove();
        }, 600);
      } else {
        component.replaceChildren(); // === remove all children
        component.remove();
      }
    });
  }

  public static disableElemsOnTime<T extends HTMLElement>(elems: T[], time: number): void {
    elems.forEach((elem: T): void => {
      elem.setAttribute('style', 'pointer-events: none; opacity: 0.5');
    });

    setTimeout((): void => {
      elems.forEach((elem: T): void => {
        elem.removeAttribute('style');
      });
    }, time);
  }

  public static switchComponentDisplay<T extends HTMLElement>(
    elem: T,
    changeType: ChangeType,
    options?: SwitchOptions
  ): void {
    switch (changeType) {
      case ChangeType.Validity:
        AppView.switchValidity(elem, options);
        break;
      case ChangeType.ContinueActive:
        AppView.switchContinueActive(elem, options);
        break;
      case ChangeType.RemoveClass:
        if (options?.class) {
          elem.classList.remove(options?.class);
        }
        if (elem.classList.contains('playarea__source')) elem.removeAttribute('id');
        break;
      case ChangeType.AddClass:
        if (options?.class) {
          elem.classList.add(options?.class);
        }
        break;
      case ChangeType.UpdateHint:
        if (elem.classList.contains('playarea__translate-text') && options?.hint) {
          MainPageView.updateTranslateText(options.hint);
        } else if (options && options.imageSrc) {
          MainPageView.toggleSourcesBackground(elem, options.imageSrc);
        }
        break;
      default:
        break;
    }
  }

  public static updateRoundsList(roundsCount: number): void {
    const allRoundOptions: HTMLOptionElement[] = Array.from(
      document.querySelectorAll('.playarea__select-round_option')
    );
    AppView.removeComponent(allRoundOptions);

    const selectRound: HTMLSelectElement | null = document.querySelector('.playarea__select-round');
    if (!selectRound) return;
    for (let i = 1; i <= roundsCount; i += 1) {
      const option: HTMLOptionElement = createElem<HTMLOptionElement>('option', {
        class: 'playarea__select-round_option',
        value: `${i - 1}` // round index
      });
      option.textContent = `Round ${i}`;
      appendElem(selectRound, [option]);
    }
  }

  public static showImage(): void {
    const allSources: HTMLDivElement[] = Array.from(document.querySelectorAll('.playarea__source'));
    allSources.forEach((source: HTMLDivElement): void => source.classList.add('solved'));

    const allSourcePlaces: HTMLDivElement[] = Array.from(
      document.querySelectorAll('.playarea__source-place')
    );
    allSourcePlaces.forEach((place: HTMLDivElement): void => place.classList.add('solved'));
  }

  public static showImageDescription(author: string, name: string, year: string): void {
    const imageDescription: HTMLParagraphElement | null = document.querySelector(
      '.playarea__image-description'
    );
    if (imageDescription) {
      imageDescription.textContent = `${author} | ${name} | ${year}`;
      AppView.switchComponentDisplay(imageDescription, ChangeType.Validity, { isValid: true });
    }
  }

  public static updateSelectedOptions(levelNumber: number, roundIndex: number): void {
    const levelOptions: HTMLOptionElement[] = Array.from(
      document.querySelectorAll('.playarea__select-level_option')
    );
    levelOptions.forEach((option: HTMLOptionElement): void => option.removeAttribute('selected'));

    const currentLevelOption: HTMLOptionElement | undefined = levelOptions.find(
      (option: HTMLOptionElement): boolean => Number(option.value) === levelNumber
    );
    if (currentLevelOption) currentLevelOption.selected = true;

    const roundOptions: HTMLOptionElement[] = Array.from(
      document.querySelectorAll('.playarea__select-round_option')
    );
    roundOptions.forEach((option: HTMLOptionElement): void => option.removeAttribute('selected'));

    const currentRoundOption: HTMLOptionElement | undefined = roundOptions.find(
      (option: HTMLOptionElement): boolean => Number(option.value) === roundIndex
    );
    if (currentRoundOption) currentRoundOption.selected = true;
  }

  public static reassignSourcesWidth(): void {
    const allSources: HTMLDivElement[] = Array.from(document.querySelectorAll('.playarea__source'));
    const allPlaces = Array.from([
      ...document.querySelectorAll('.playarea__source-place'),
      ...document.querySelectorAll('.playarea__sentence-place')
    ]) as HTMLDivElement[];
    const onlyFilledPlaces = allPlaces.filter(
      (place: HTMLDivElement): boolean => place.style.width === 'max-content'
    ) as HTMLDivElement[];

    AppView.removeSourcesWidth(allSources, onlyFilledPlaces);

    setTimeout((): void => {
      allSources.forEach((source: HTMLDivElement): void => {
        const sourceLink: HTMLDivElement = source;
        sourceLink.style.width = `${source.getBoundingClientRect().width}px`;
        setTimeout((): void => {
          sourceLink.style.removeProperty('transition');
        }, 0);
      });

      onlyFilledPlaces.forEach((place: HTMLDivElement): void => {
        const placeLink: HTMLDivElement = place;
        placeLink.style.width = 'max-content';
        setTimeout((): void => {
          placeLink.style.removeProperty('transition');
        }, 0);
      });
    }, 0);
  }

  private static removeSourcesWidth(sources: HTMLDivElement[], places: HTMLDivElement[]): void {
    [...sources, ...places].forEach((elem: HTMLDivElement): void => {
      const elemLink: HTMLDivElement = elem;
      elemLink.style.transition = '0s';
    });

    setTimeout((): void => {
      places.forEach((place: HTMLDivElement): void => {
        place.style.removeProperty('width');
      });

      sources.forEach((source: HTMLDivElement): void => {
        const sourceLink: HTMLDivElement = source;
        sourceLink.style.width = '100%';
      });
    }, 0);
  }

  public static updateSourcesSize(
    playboardSize: PlayboardSize,
    sourceHeight: number,
    round: Round,
    isNeedRecalculate?: boolean
  ): void {
    const rowsCount = 10;
    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex += 1) {
      const sourcesInRow = Array.from(
        document.querySelectorAll(`.playarea__source[data-row="${rowIndex}"]`)
      ) as HTMLDivElement[];

      if (sourcesInRow.length) {
        const textExample: string[] = round.words[rowIndex].textExample.split(' ');
        let positionX = 0;

        textExample.forEach((word: string): void => {
          const positionY = rowIndex * sourceHeight;

          const currentSource = AppView.findSource(sourcesInRow, word);
          AppView.updateSourceImg(currentSource, positionX, positionY, playboardSize);
          positionX += currentSource.getBoundingClientRect().width;

          AppView.updatePegSize(currentSource, positionX, positionY, playboardSize, sourceHeight);
          sourcesInRow.forEach((source: HTMLDivElement): void => source.classList.remove('marked'));
        });
      }
    }

    if (!isNeedRecalculate) {
      setTimeout((): void => {
        app.handleActionRequest(HandleAction.ResizeAgain);
      }, 200);
    }
  }

  private static findSource(sources: HTMLDivElement[], word: string): HTMLDivElement {
    const result = sources.find((source: HTMLDivElement): boolean => {
      return source.textContent === word && !source.classList.contains('marked');
    }) as HTMLDivElement;
    result.classList.add('marked');
    return result;
  }

  private static updateSourceImg(
    source: HTMLDivElement,
    x: number,
    y: number,
    playboardSize: PlayboardSize
  ) {
    const sourceImg = source.firstElementChild as HTMLDivElement;
    sourceImg.style.backgroundSize = `${playboardSize.width}px ${playboardSize.height}px`;
    sourceImg.style.backgroundPosition = `-${x}px -${y}px`;
  }

  private static updatePegSize(
    source: HTMLDivElement,
    positionX: number,
    positionY: number,
    playboardSize: PlayboardSize,
    sourceHeight: number
  ) {
    const peg = source.lastElementChild as HTMLDivElement;
    if (!peg.classList.contains('playarea__peg_outer')) return;

    peg.style.backgroundSize = `${playboardSize.width}px ${playboardSize.height}px`;
    const pegSize: number = peg.getBoundingClientRect().width;

    const pegPositionY = positionY + (sourceHeight - pegSize) / 2;
    peg.style.backgroundPosition = `-${positionX - 2}px -${pegPositionY}px`;
  }

  private static switchValidity<T extends HTMLElement>(elem: T, options?: SwitchOptions): void {
    if (options?.isValid) {
      elem.classList.add('valid');
      elem.classList.remove('not-valid');
    } else if (options?.isValid === false) {
      elem.classList.remove('valid');
      elem.classList.add('not-valid');
    } else {
      elem.classList.remove('valid');
      elem.classList.remove('not-valid');
    }
  }

  private static switchContinueActive<T extends HTMLElement>(
    elem: T,
    options?: SwitchOptions
  ): void {
    if (options?.isValid) {
      const elemLink: T = elem;
      elem.classList.add('continue');
      app.handleActionRequest(HandleAction.Continue);
      elem.classList.remove('valid');
      elemLink.textContent = 'Continue';
    } else if (options?.isShowImage) {
      const elemLink: T = elem;
      elem.classList.add('show-image');
      elemLink.textContent = 'Next round';
    } else {
      const elemLink: T = elem;
      app.handleActionRequest(HandleAction.Check);
      elem.classList.remove('show-image');
      elem.classList.remove('continue');
      elem.classList.remove('valid');
      elemLink.textContent = 'Check';
    }
  }

  public static initHints(hintsStatus: HintsStatus): void {
    if (!hintsStatus.translateHintStatus) {
      const translateBtn: HTMLButtonElement | null = document.querySelector(
        '.playarea__translate-hint'
      );
      const clickEvent = new MouseEvent('click');
      translateBtn?.dispatchEvent(clickEvent);
    }
    if (!hintsStatus.audioHintStatus) {
      const audioBtn: HTMLButtonElement | null = document.querySelector('.playarea__audio-hint');
      const clickEvent = new MouseEvent('click');
      audioBtn?.dispatchEvent(clickEvent);
    }
    if (!hintsStatus.backgroundHintStatus) {
      const backgroundHintBtn: HTMLButtonElement | null = document.querySelector(
        '.playarea__background-hint'
      );
      const clickEvent = new MouseEvent('click');
      backgroundHintBtn?.dispatchEvent(clickEvent);
    }
  }

  public static drawBasicMarkup(): void {
    const container: HTMLDivElement = createElem<HTMLDivElement>('div', { class: 'container' });
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (body) {
      appendElem(body, [container]);
    }
    const header: HTMLElement = createElem<HTMLElement>('header', { class: 'header' });
    const main: HTMLElement = createElem<HTMLElement>('main', { class: 'main' });
    const footer: HTMLElement = createElem<HTMLElement>('footer', { class: 'footer' });
    appendElem(container, [header, main, footer]);
  }

  public static moveComponent<T extends HTMLElement>(
    component: T,
    action: MoveAction,
    target?: T
  ): void {
    switch (action) {
      case MoveAction.MoveSource:
        if (component instanceof HTMLDivElement) {
          MainPageView.moveSource(component);
        }
        break;
      case MoveAction.SetSource:
        if (component instanceof HTMLDivElement && target) {
          MainPageView.setSource(target, component);
        }
        break;
      default:
        break;
    }
  }
}
