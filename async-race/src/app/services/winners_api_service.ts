import { CRUDWinnersOptions, WinnerInfo, Winners } from '../../interfaces';

export class WinnersApiService {
  private url: string;

  constructor() {
    this.url = 'http://127.0.0.1:3000/winners';
  }

  public async getWinners(options: CRUDWinnersOptions): Promise<Winners> {
    const response: Response = await fetch(
      `${this.url}?_page=${options.page}&_limit=${options.limit}&_sort=${options.sort}&_order=${options.order}`,
      { method: 'GET' }
    );
    const parsedResponse: WinnerInfo[] = await response.json();

    if (!options.page) throw new Error('page is undefined');
    const result: Winners = {
      winners: parsedResponse,
      total: Number(response.headers.get('X-Total-Count')),
      page: options.page
    };
    return result;
  }

  public async getWinner(
    id: string
  ): Promise<Pick<WinnerInfo, 'id' & 'wins' & 'time'> | undefined> {
    const response: Response = await fetch(`${this.url}/${id}`, { method: 'GET' });
    if (response.status === 404) return undefined;
    const parsedResponse: WinnerInfo = await response.json();
    return parsedResponse;
  }

  public async createWinner(options: Pick<WinnerInfo, 'id' | 'wins' | 'time'>): Promise<void> {
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
    await fetch(`${this.url}/${id}`, { method: 'DELETE' });
  }

  public async updateWinner(
    options: Pick<CRUDWinnersOptions, 'id' | 'wins' | 'time'>
  ): Promise<void> {
    await fetch(`${this.url}/${options.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
  }
}
