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
