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
  Generate = 'generate'
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
