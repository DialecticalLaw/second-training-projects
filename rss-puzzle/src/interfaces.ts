export interface LooseStringObject {
  [key: string]: string;
}

export type LoginWrappers = [HTMLFormElement, HTMLUListElement, HTMLDivElement, HTMLDivElement];

export interface LocalStorageData {
  name?: string;
  surname?: string;
  isLogin: boolean;
}

export type StartPageWrappers = [HTMLDivElement, HTMLDivElement];

interface LevelData {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
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
  levelData: LevelData;
  words: Sentence[];
}

export interface Level {
  rounds: Round[];
  roundsCount: number;
}

export interface SwitchOptions {
  isValid?: boolean;
  class?: string;
}

export interface PuzzleInfo {
  word: string;
  puzzleType: 'start' | 'middle' | 'end';
  index: number;
}

export interface DisplayOptions {
  puzzlesInfo: PuzzleInfo[];
  sentenceIndex?: number;
}
