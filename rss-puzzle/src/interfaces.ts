export interface LooseStringObject {
  [key: string]: string;
}

export type LoginWrappers = [HTMLFormElement, HTMLUListElement, HTMLDivElement, HTMLDivElement];

export interface CompletedRounds {
  level1: number[];
  level2: number[];
  level3: number[];
  level4: number[];
  level5: number[];
  level6: number[];
}

export type Levels = `level${'1' | '2' | '3' | '4' | '5' | '6'}`;

export interface CompletedRound {
  level: Levels;
  round: number;
}

export interface LevelsRoundsCount {
  [key: string]: number;
}

export interface LocalStorageData {
  name?: string;
  surname?: string;
  isLogin: boolean;
  translateHint: boolean;
  audioHint: boolean;
  backgroundHint: boolean;
  completedRounds: CompletedRounds;
}

export type StartPageWrappers = [HTMLDivElement, HTMLDivElement];

interface RoundData {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
}

export interface HintsStatus {
  translateHintStatus: boolean;
  audioHintStatus: boolean;
  backgroundHintStatus: boolean;
}

export interface Sentence {
  audioExample: string;
  id: number;
  textExample: string;
  textExampleTranslate: string;
  word: string;
  wordTranslate: string;
}

export interface Round {
  levelData: RoundData;
  words: Sentence[];
}

export interface Level {
  rounds: Round[];
  roundsCount: number;
}

export interface SwitchOptions {
  isValid?: boolean;
  class?: string;
  hint?: string;
  imageSrc?: string;
}

export interface PuzzleInfo {
  word: string;
  puzzleType: 'start' | 'middle' | 'end';
  index: number;
}

export interface InfoForMark {
  completedRounds: CompletedRounds;
  levelsRoundsCount: LevelsRoundsCount;
  currentLevel: Levels;
}

export interface DisplayOptions {
  puzzlesInfo?: PuzzleInfo[];
  imageSrc?: string;
  sentenceIndex?: number;
  roundsCount?: number;
  infoForMark?: InfoForMark;
}

export interface PlayboardSize {
  width: number;
  height: number;
}
