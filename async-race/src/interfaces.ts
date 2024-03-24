export interface LooseStringObject {
  [key: string]: string;
}

export interface Car {
  color: string;
  id: number;
  name: string;
}

export type Cars = Car[];

export interface PageInfo {
  cars: Cars;
  total: number;
  page: number;
}
