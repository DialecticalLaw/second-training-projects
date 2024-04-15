import { WebSocketApiService } from '../services/api-service';

export class Model {
  private webSocketApiService: WebSocketApiService;

  public id: string;

  public login?: string;

  private password?: string;

  constructor() {
    this.webSocketApiService = new WebSocketApiService();
    this.id = crypto.randomUUID();
  }

  public connect(): void {
    this.webSocketApiService.connectWithServer();
  }

  public sendLogin(login: string, password: string): void {
    this.login = login;
    this.password = password;

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

  public sendLogout(): void {
    if (!this.login || !this.password) throw new Error('login or password is undefined');
    this.webSocketApiService.sendUserData({
      id: this.id,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: this.login,
          password: this.password
        }
      }
    });
  }

  public sendGetUsersRequests(): void {
    this.webSocketApiService.sendUserData({
      id: this.id,
      type: 'USER_ACTIVE',
      payload: null
    });
    this.webSocketApiService.sendUserData({
      id: this.id,
      type: 'USER_INACTIVE',
      payload: null
    });
  }
}
