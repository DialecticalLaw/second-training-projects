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

    this.webSocketApiService.sendData({
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
    this.webSocketApiService.sendData({
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
    this.webSocketApiService.sendData({
      id: this.id,
      type: 'USER_ACTIVE',
      payload: null
    });
    this.webSocketApiService.sendData({
      id: this.id,
      type: 'USER_INACTIVE',
      payload: null
    });
  }

  public getMessageHistory(interlocutor: string): void {
    this.webSocketApiService.sendData({
      id: this.id,
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: interlocutor
        }
      }
    });
  }

  public sendMessage(interlocutor: string, message: string): void {
    this.webSocketApiService.sendData({
      id: this.id,
      type: 'MSG_SEND',
      payload: {
        message: {
          to: interlocutor,
          text: message
        }
      }
    });
  }
}
