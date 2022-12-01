import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NicknameHistoryServcie {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(id: number) {
    return await this.prisma.memberNicknameHistory.findMany({
      where: { memberId: id },
      orderBy: { createdAt: 'asc' },
    });
  }
}
