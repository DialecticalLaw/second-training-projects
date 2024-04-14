import { Events, APIRequest } from '../../interfaces';
import { dispatch } from './events-service';

function dispatchUserRequest(data: APIRequest): void {
  if (!(data.payload && 'user' in data.payload)) throw new Error('user not found in payload');

  if ('isLogined' in data.payload.user) {
    if (data.payload.user.isLogined) {
      dispatch(Events.Logined, { id: data.id, login: data.payload.user.login });
    } else {
      dispatch(Events.Logout, { id: data.id, login: data.payload.user.login });
    }
  }
}

function dispatchErrorRequest(data: APIRequest): void {
  if (!(data.payload && 'error' in data.payload)) throw new Error('error not found in payload');

  if (data.payload.error === 'incorrect password') {
    dispatch(Events.IncorrectPassword);
  }
  if (data.payload.error === 'a user with this login is already authorized') {
    dispatch(Events.AlreadyAuth);
  }
}

export class WebSocketApiService {
  private url: string;

  private socket?: WebSocket;

  constructor() {
    this.url = 'ws://127.0.0.1:4000/';
  }

  public connectWithServer(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onclose = (): void => {
      dispatch(Events.CloseConnect);
    };

    this.socket.onerror = (): void => {
      dispatch(Events.ErrorConnect);
    };

    this.socket.onopen = (): void => {
      this.handleSocketRequest();
      dispatch(Events.Connect);
    };
  }

  public async sendUserData(userData: APIRequest): Promise<void> {
    if (!this.socket) throw new Error('socket is undefined');
    this.socket.send(JSON.stringify(userData));
  }

  private handleSocketRequest(): void {
    if (!this.socket) throw new Error('socket is undefined');

    this.socket.onmessage = (event: MessageEvent) => {
      const data: APIRequest = JSON.parse(event.data);
      if (!data.payload) throw new Error('payload is null');

      if ('user' in data.payload) {
        dispatchUserRequest(data);
      }

      if ('error' in data.payload) {
        dispatchErrorRequest(data);
      }
    };
  }
}
