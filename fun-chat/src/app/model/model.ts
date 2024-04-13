import { WebSocketApiService } from '../services/api-service';

export class Model {
  private webSocketApiService: WebSocketApiService;

  public id: string;

  constructor() {
    this.webSocketApiService = new WebSocketApiService();
    this.id = crypto.randomUUID();
  }

  public connect(): void {
    this.webSocketApiService.connectWithServer();
  }

  public async login(login: string, password: string): Promise<void> {
    this.webSocketApiService.sendUserData({
      id: this.id,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login,
          password
        }
      }
    });
  }
}
