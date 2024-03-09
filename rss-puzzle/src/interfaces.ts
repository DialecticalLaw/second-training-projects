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

export type MainPageWrappers = [HTMLDivElement, HTMLDivElement, HTMLDivElement];

interface LevelData {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
}

interface Sentence {
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
