import { Module } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { PlanetController } from './planet.controller';
import { PlanetService } from './planet.service';

@Module({
  controllers: [PlanetController],
  providers: [PlanetService, PrismaService],
})
export class PlanetModule {}
