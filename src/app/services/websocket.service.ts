import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/websocket';
import { Message } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socket: WebSocketSubject<Message>;

  constructor() {
    this.socket = webSocket('wss://echo.websocket.org');
  }

  public send = (message: Message) => {
    this.socket.next(message);
  }
}
