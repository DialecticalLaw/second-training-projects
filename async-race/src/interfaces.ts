export interface LooseStringObject {
  [key: string]: string;
}

export interface Car {
  color?: string;
  id?: string;
  name?: string;
}

export type InputsCarData = Omit<Car, 'id'>;

export type Cars = Car[];

export interface GaragePageInfo {
  cars: Cars;
  total: number;
  page: number;
}

export enum HandleAction {
  Create = 'create',
  Select = 'select',
  Update = 'update',
  Delete = 'delete',
  PaginationGarage = 'paginationGarage',
  PaginationWinners = 'paginationWinners',
  Generate = 'generate',
  Gas = 'gas',
  Brake = 'brake',
  Race = 'race',
  Reset = 'reset',
  SwitchPage = 'switchPage',
  Sort = 'sort'
}

export enum CRUD {
  Create,
  Read,
  ReadPage,
  Update,
  Delete
}

export interface CRUDGarageOptions extends Car {
  page?: number;
}

export type CRUDGarageResult = GaragePageInfo | Car | undefined | void;

export interface CarBrands {
  [key: string]: string[];
}

export enum ViewType {
  Garage,
  Winners,
  WinnersCurrent
}

export enum SortType {
  Id = 'id',
  Wins = 'wins',
  Time = 'time'
}

export interface WinnersPageOptions {
  limit: number;
  sort: SortType;
  order: 'ASC' | 'DESC';
}

export type UpdateCurrentPage = (viewType: ViewType, options?: WinnersPageOptions) => Promise<void>;

export type EngineStatus = 'started' | 'stopped' | 'drive';

export interface CarProps {
  velocity: number;
  distance: number;
}

export interface SuccessResponse {
  success: boolean;
}

export interface CarAbortControllers {
  [key: string]: AbortController;
}

export interface CarBtnStatus {
  btn: HTMLButtonElement;
  status: boolean;
}

export interface AbortCarData {
  btn: HTMLButtonElement;
  adjacentBtn: HTMLButtonElement;
  abort: AbortController;
}

export type UpdateCarResponse = CarProps | SuccessResponse | undefined;

export enum PageMode {
  Race,
  Default
}

export interface WinnerInfo {
  id?: string;
  wins?: number;
  time?: number;
  color?: string;
  name?: string;
}

export interface Winners {
  winners: WinnerInfo[];
  total: number;
  page: number;
}

export type CRUDWinnersResult = Winners | WinnerInfo | undefined | void;

export interface CRUDWinnersOptions extends WinnerInfo {
  page?: number;
  limit?: number;
  sort?: SortType;
  order?: 'ASC' | 'DESC';
}
