import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimelineService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(memberId: number) {
    return this.prisma.timeline.findMany({ where: { memberId } });
  }
}
