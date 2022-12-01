import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  async find(fromId: number, toId: number) {
    return await this.prisma.follow.findFirst({
      where: { fromMemberId: fromId, toMemberId: toId },
    });
  }

  async findAll(fromId: number) {
    return await this.prisma.follow.findMany({
      where: { fromMemberId: fromId },
    });
  }

  async creat(fromId: number, toId: number) {
    return await this.prisma.follow.create({
      data: { fromMemberId: fromId, toMemberId: toId },
    });
  }
}
