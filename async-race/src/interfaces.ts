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

export interface PageInfo {
  cars: Cars;
  total: number;
  page: number;
}

export enum HandleAction {
  Create = 'create',
  Select = 'select',
  Update = 'update',
  Delete = 'delete',
  Pagination = 'pagination',
  Generate = 'generate',
  Gas = 'gas',
  Brake = 'brake'
}

export enum CRUD {
  Create,
  ReadPage,
  Update,
  Delete
}

export interface CRUDOptions extends Car {
  page?: number;
}

export type CRUDResult = PageInfo | Car | undefined | void;

export interface CarBrands {
  [key: string]: string[];
}

export type UpdateCurrentPage = () => Promise<void>;

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
