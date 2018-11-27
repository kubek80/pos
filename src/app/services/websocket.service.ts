import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/websocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socket: WebSocketSubject<any>;

  constructor() {
    this.socket = webSocket('ws://echo.websocket.org/');
  }

  public send = (message: any) => {
    this.socket.next(message);
  }
}
