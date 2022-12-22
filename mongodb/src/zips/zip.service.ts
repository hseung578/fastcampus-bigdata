import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ZipService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.zips.findMany({
      where: { state: 'LA', pop: { gte: 40000 } },
      orderBy: { city: 'asc' },
    });
  }
}
