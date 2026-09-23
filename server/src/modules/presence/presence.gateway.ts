import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { JoinFloorDto, SendKnockDto, RespondKnockDto } from './dto/presence.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PresenceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(PresenceGateway.name);

  constructor(private readonly presenceService: PresenceService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const occupant = this.presenceService.removeOccupant(client.id);
    if (occupant) {
      this.logger.log(`Occupant left: ${occupant.userName} (${occupant.userId})`);
      this.server.to(`floor:${occupant.floorId}`).emit('presence:member_left', {
        userId: occupant.userId,
        deskId: occupant.deskId,
      });
    }
  }

  @SubscribeMessage('presence:join')
  handleJoinFloor(@ConnectedSocket() client: Socket, @MessageBody() dto: JoinFloorDto) {
    client.join(`floor:${dto.floorId}`);
    const occupant = {
      userId: dto.userId,
      userName: dto.userName,
      floorId: dto.floorId,
      deskId: dto.deskId,
      status: dto.status || 'AVAILABLE',
      socketId: client.id,
      lastHeartbeat: Date.now(),
    };

    this.presenceService.setOccupant(client.id, occupant);

    // Send current floor occupants to joining client
    const currentOccupants = this.presenceService.getFloorOccupants(dto.floorId);
    client.emit('presence:floor_state', currentOccupants);

    // Broadcast new member to floor peers
    client.to(`floor:${dto.floorId}`).emit('presence:member_joined', occupant);
    return { success: true };
  }

  @SubscribeMessage('presence:heartbeat')
  handleHeartbeat(@ConnectedSocket() client: Socket) {
    const ok = this.presenceService.updateHeartbeat(client.id);
    return { success: ok, timestamp: Date.now() };
  }

  @SubscribeMessage('knock:send')
  handleKnock(@ConnectedSocket() client: Socket, @MessageBody() dto: SendKnockDto) {
    const occupant = this.presenceService.getOccupant(client.id);
    this.server.emit(`knock:received:${dto.toUserId}`, {
      knockId: `knock_${Date.now()}`,
      fromUserId: dto.fromUserId,
      fromUserName: occupant?.userName || 'Colleague',
      message: dto.message || 'Quick huddle request',
      timestamp: Date.now(),
    });
    return { delivered: true };
  }

  @SubscribeMessage('knock:respond')
  handleKnockResponse(@ConnectedSocket() client: Socket, @MessageBody() dto: RespondKnockDto) {
    this.server.emit(`knock:resolved:${dto.knockId}`, {
      decision: dto.decision,
      timestamp: Date.now(),
    });
    return { acknowledged: true };
  }
}
