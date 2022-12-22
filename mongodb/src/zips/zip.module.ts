import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ZipController } from './zip.controller';
import { ZipService } from './zip.service';

@Module({
  controllers: [ZipController],
  providers: [ZipService, PrismaService],
})
export class ZipModule {}
