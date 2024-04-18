import { Events, APIRequest } from '../../interfaces';
import { dispatch } from './events-service';

function dispatchUserRequest(data: APIRequest): void {
  if (!(data.payload && 'user' in data.payload)) throw new Error('user not found in payload');

  if (
    'isLogined' in data.payload.user &&
    (data.type === 'USER_LOGIN' || data.type === 'USER_LOGOUT')
  ) {
    if (data.payload.user.isLogined) {
      dispatch(Events.Logined, { id: data.id, login: data.payload.user.login });
    } else {
      dispatch(Events.Logout, { id: data.id, login: data.payload.user.login });
    }
  }

  if (
    'isLogined' in data.payload.user &&
    (data.type === 'USER_EXTERNAL_LOGIN' || data.type === 'USER_EXTERNAL_LOGOUT')
  ) {
    dispatch(Events.ThirdParty, {
      login: data.payload.user.login,
      isLogined: data.payload.user.isLogined
    });
  }
}

function dispatchUsersRequest(data: APIRequest): void {
  if (!(data.payload && 'users' in data.payload)) throw new Error('users not found in payload');

  if (data.type === 'USER_ACTIVE' || data.type === 'USER_INACTIVE') {
    dispatch(Events.UserList, { users: data.payload.users });
  }
}

function dispatchMessageRequest(data: APIRequest): void {
  if (!(data.payload && 'message' in data.payload)) throw new Error('message not found in payload');
}

function dispatchMessagesRequest(data: APIRequest): void {
  if (!(data.payload && 'messages' in data.payload)) {
    throw new Error('message not found in payload');
  }

  dispatch(Events.MessageHistory, { messages: data.payload.messages });
}

function dispatchErrorRequest(data: APIRequest): void {
  if (!(data.payload && 'error' in data.payload)) throw new Error('error not found in payload');

  if (data.payload.error === 'incorrect password') {
    dispatch(Events.IncorrectPassword);
  } else if (data.payload.error === 'a user with this login is already authorized') {
    dispatch(Events.AlreadyAuth);
  } else {
    throw new Error(data.payload.error);
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

  public sendData(userData: APIRequest): void {
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

      if ('users' in data.payload) {
        dispatchUsersRequest(data);
      }

      if ('error' in data.payload) {
        dispatchErrorRequest(data);
      }

      if ('message' in data.payload) {
        dispatchMessageRequest(data);
      }

      if ('messages' in data.payload) {
        dispatchMessagesRequest(data);
      }
    };
  }
}
