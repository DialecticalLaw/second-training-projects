export interface LooseStringObject {
  [key: string]: string;
}

export type LoginWrappers = [HTMLFormElement, HTMLUListElement, HTMLDivElement, HTMLDivElement];

export interface LocalStorageData {
  name?: string;
  surname?: string;
  isLogin: boolean;
  translateHint: boolean;
  audioHint: boolean;
  backgroundHint: boolean;
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

export interface DisplayOptions {
  puzzlesInfo: PuzzleInfo[];
  imageSrc: string;
  sentenceIndex: number;
}

export interface PlayboardSize {
  width: number;
  height: number;
}
