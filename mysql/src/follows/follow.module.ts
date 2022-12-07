import { FollowController } from './follow.controller';
import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { PrismaService } from 'src/prisma.service';
import { MemberModule } from 'src/members/member.module';

@Module({
  imports: [MemberModule],
  controllers: [FollowController],
  providers: [FollowService, PrismaService],
  exports: [FollowService],
})
export class FollowModule {}
