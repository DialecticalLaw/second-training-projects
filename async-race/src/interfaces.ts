export interface LooseStringObject {
  [key: string]: string;
}

export interface Car {
  color?: string;
  id?: number;
  name?: string;
}

export type DataForCreate = Omit<Car, 'id'>;

export type Cars = Car[];

export interface PageInfo {
  cars: Cars;
  total: number;
  page: number;
}

export enum HandleAction {
  Start
}

export enum OptionsTypes {
  Create,
  Update
}

export enum CRUD {
  Create,
  ReadPage,
  ReadCar,
  Update,
  Delete
}

export interface CRUDOptions extends Car {
  page?: number;
}

export type CRUDResult = PageInfo | Car | undefined;
