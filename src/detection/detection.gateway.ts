/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';

// first we be required a gateway so that data will be sent to frontend
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DetectionGateway {
// the socket server so that data can be recieved and sent further
  @WebSocketServer()
  server!: Server;

  // 🔥 send alert to frontend
  sendFireAlert(data: any) {
    this.server.emit('fireAlert', data);
  }
}