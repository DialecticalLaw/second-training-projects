import { SortType, WinnerInfo, Winners } from '../../interfaces';

export class WinnersApiService {
  private url: string;

  constructor() {
    this.url = 'http://127.0.0.1:3000/winners';
  }

  public async getWinners(
    page: number,
    limit: number,
    sort: SortType,
    order: 'ASC' | 'DESC'
  ): Promise<Winners> {
    const response: Response = await fetch(
      `${this.url}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
      { method: 'GET' }
    );
    const parsedResponse: WinnerInfo[] = await response.json();
    const result: Winners = {
      winners: parsedResponse,
      total: Number(response.headers.get('X-Total-Count'))
    };
    return result;
  }

  public async getWinner(id: string): Promise<WinnerInfo> {
    const response: Response = await fetch(`${this.url}/${id}`, { method: 'GET' });
    if (response.status === 404) throw new Error(`id not found: ${id}`);
    const parsedResponse: WinnerInfo = await response.json();
    return parsedResponse;
  }

  public async createWinner(options: WinnerInfo): Promise<void> {
    const response: Response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    if (response.status === 500) throw new Error(`duplicate id: ${options.id}`);
  }

  public async deleteWinner(id: string): Promise<void> {
    const response: Response = await fetch(`${this.url}/${id}`, { method: 'DELETE' });
    if (response.status === 404) throw new Error(`id not found: ${id}`);
  }

  public async updateWinner(id: string, options: Omit<WinnerInfo, 'id'>): Promise<void> {
    const response: Response = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    if (response.status === 404) throw new Error(`id not found: ${id}`);
  }
}
