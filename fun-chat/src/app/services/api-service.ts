import { Events, APIRequest } from '../../interfaces';
import { dispatch } from './events-service';

export class WebSocketApiService {
  private url: string;

  private socket?: WebSocket;

  constructor() {
    this.url = 'ws://127.0.0.1:4000/';
  }

  public connectWithServer(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onclose = () => {
      dispatch(Events.CloseConnect);
    };

    this.socket.onerror = () => {
      dispatch(Events.ErrorConnect);
    };

    this.socket.onopen = () => {
      this.handleServerMessages();
      dispatch(Events.Connect);
    };
  }

  public async sendUserData(userData: APIRequest): Promise<void> {
    if (!this.socket) throw new Error('socket is undefined');
    this.socket.send(JSON.stringify(userData));
  }

  private handleServerMessages() {
    if (!this.socket) throw new Error('socket is undefined');
    this.socket.onmessage = (event: MessageEvent) => {
      const data: APIRequest = JSON.parse(event.data);
      console.log(data);
    };
  }
}
