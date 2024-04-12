import { Events } from '../../interfaces';
import { dispatch } from './events-service';

export class WebSocketApiService {
  private url: string;

  private socket?: WebSocket;

  constructor() {
    this.url = 'ws://127.0.0.1:4000/';
  }

  public async connectWithServer(): Promise<void> {
    this.socket = new WebSocket(this.url);
    this.socket.onclose = () => {
      dispatch(Events.CloseConnect);
    };
    this.socket.onerror = () => {
      dispatch(Events.ErrorConnect);
    };

    await new Promise<void>((resolve): void => {
      if (!this.socket) throw new Error('socket is undefined');
      this.socket.onopen = () => {
        dispatch(Events.Connect);
        resolve();
      };
    });
  }
}
