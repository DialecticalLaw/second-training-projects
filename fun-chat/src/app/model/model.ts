import { WebSocketApiService } from '../services/api-service';

export class Model {
  private webSocketApiService: WebSocketApiService;

  constructor() {
    this.webSocketApiService = new WebSocketApiService();
  }

  public async connect(): Promise<void> {
    await this.webSocketApiService.connectWithServer();
  }
}
