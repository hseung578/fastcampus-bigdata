import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';

@Injectable()
export class PlanetService {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string) {
    return await this.prisma.planets.findFirst({ where: { name } });
  }

  async findAllByCondition() {
    return await this.prisma.planets.findMany({
      where: { AND: [{ hasRings: true }, { orderFromSun: { lte: 6 } }] },
    });
  }
}
