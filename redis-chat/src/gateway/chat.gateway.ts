import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export type Message = {
  name: string;
  text: string;
};

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private static readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    ChatGateway.logger.debug(`Socket Server Init Complete`);
  }

  handleConnection(client: Socket) {
    ChatGateway.logger.debug(`${client.id} is connected!`);
    this.server.emit('message', {
      name: `admin`,
      text: `join chat.`,
    });
  }

  handleDisconnect(client: Socket) {
    ChatGateway.logger.debug(`${client.id} is disconnected...`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: Message): void {
    console.log(message);
    this.server.emit('message', message);
  }
}
