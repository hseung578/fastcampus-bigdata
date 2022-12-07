import { PrismaService } from 'src/prisma.service';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TimelineController],
  providers: [TimelineService, PrismaService],
  exports: [TimelineService],
})
export class TimelineModule {}
