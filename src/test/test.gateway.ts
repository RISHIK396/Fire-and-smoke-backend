/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class TestGateway {
  @WebSocketServer()
  server!: Server;

  // 🔥 USER JOINS THEIR ROOM
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(userId);
    console.log(`✅ User joined room: ${userId}`);
  }

  // 🔥 SEND ONLY TO SPECIFIC USER
  sendToUser(userId: string, data: any) {
    this.server.to(userId).emit('newDetection', data);
  }
}
