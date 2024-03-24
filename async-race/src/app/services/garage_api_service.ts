import { Car, Cars, InputsCarData, PageInfo } from '../../interfaces';

export async function getCars(page: number): Promise<PageInfo | undefined> {
  const responseCars: Response = await fetch(
    `http://127.0.0.1:3000/garage?_page=${page}&_limit=7`,
    {
      method: 'GET'
    }
  );
  const cars: Cars = await responseCars.json();
  const total: string | null = await responseCars.headers.get('X-Total-Count');
  if (total) {
    return {
      cars,
      total: Number(total),
      page
    };
  }
  throw new Error('total is undefined at getCars');
}

export async function createCar(options: InputsCarData): Promise<Car | undefined> {
  const responseCreatedCar: Response = await fetch(`http://127.0.0.1:3000/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  });
  const createdCar: Car = await responseCreatedCar.json();
  return createdCar;
}

export async function updateCar(id: string, options: InputsCarData): Promise<Car | undefined> {
  const responseUpdatedCar: Response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  });
  const updatedCar: Car = await responseUpdatedCar.json();
  return updatedCar;
}
