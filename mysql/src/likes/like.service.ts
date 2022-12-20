import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(postId: number, memberId: number) {
    await this.prisma.like.create({ data: { postId, memberId } });
  }
}
