import { ClientUserData, NotificationType, ServerUserData } from '../../interfaces';
import { WebSocketApiService } from '../services/api-service';

window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('dialecticallaw-fun-chat');
});

export class Model {
  private webSocketApiService: WebSocketApiService;

  public id: string;

  public login?: string;

  private password?: string;

  public editingMessageId?: string;

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
    sessionStorage.setItem('dialecticallaw-fun-chat', JSON.stringify({ login, password }));

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

  public tryRelogin(): void {
    const sessionData: string | null = sessionStorage.getItem('dialecticallaw-fun-chat');
    if (sessionData) {
      const parsedLsData: Required<ClientUserData> = JSON.parse(sessionData);
      this.sendLogin(parsedLsData.login, parsedLsData.password);
    }
  }

  public sendLogout(): void {
    if (!this.login || !this.password) throw new Error('login or password is undefined');
    sessionStorage.removeItem('dialecticallaw-fun-chat');
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

  public getMessageHistory(interlocutors: string | ServerUserData[]): void {
    if (Array.isArray(interlocutors)) {
      interlocutors
        .filter((interlocutor: ServerUserData) => interlocutor.login !== this.login)
        .forEach((interlocutor: ServerUserData) => {
          this.webSocketApiService.sendData({
            id: this.id,
            type: 'MSG_FROM_USER',
            payload: {
              user: {
                login: interlocutor.login
              }
            }
          });
        });
    } else {
      this.webSocketApiService.sendData({
        id: this.id,
        type: 'MSG_FROM_USER',
        payload: {
          user: {
            login: interlocutors
          }
        }
      });
    }
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

  public sendNotificationMessage(notifType: NotificationType, id: string, text?: string): void {
    if (notifType === NotificationType.Delete || notifType === NotificationType.Read) {
      this.webSocketApiService.sendData({
        id: this.id,
        type: notifType,
        payload: {
          message: {
            id
          }
        }
      });
    } else {
      if (!text) throw new Error('text is undefined');
      this.webSocketApiService.sendData({
        id: this.id,
        type: 'MSG_EDIT',
        payload: {
          message: {
            id,
            text
          }
        }
      });
    }
  }
}
