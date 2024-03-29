import { Car, Cars, InputsCarData, PageInfo } from '../../interfaces';

export class GarageApiService {
  private url: string;

  constructor() {
    this.url = 'http://127.0.0.1:3000/garage';
  }

  public async getCars(page: number): Promise<PageInfo | undefined> {
    const responseCars: Response = await fetch(`${this.url}?_page=${page}&_limit=7`, {
      method: 'GET'
    });
    const cars: Cars = await responseCars.json();
    const total: string | null = responseCars.headers.get('X-Total-Count');
    if (total) {
      return {
        cars,
        total: Number(total),
        page
      };
    }
    throw new Error('total is undefined at getCars');
  }

  public async createCar(options: InputsCarData): Promise<Car | undefined> {
    const responseCreatedCar: Response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    const createdCar: Car = await responseCreatedCar.json();
    return createdCar;
  }

  public async updateCar(id: string, options: InputsCarData): Promise<Car | undefined> {
    const responseUpdatedCar: Response = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    const updatedCar: Car = await responseUpdatedCar.json();
    return updatedCar;
  }

  public async deleteCar(id: string): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    }).then((response: Response) => {
      if (!response.ok) throw new Error(`wrong response: ${response.status}`);
    });
  }
}
