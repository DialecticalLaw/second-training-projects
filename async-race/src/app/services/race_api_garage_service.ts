import { Cars, PageInfo } from '../../interfaces';

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
      total: Number(total)
    };
  }
  throw new Error('total is undefined at getCars');
}
