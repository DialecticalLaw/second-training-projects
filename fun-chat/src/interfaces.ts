export interface LooseStringObject {
  [key: string]: string;
}

export enum Page {
  Login,
  Main,
  Info
}

export enum HandleAction {
  Info = 'info',
  Login = 'login'
}
