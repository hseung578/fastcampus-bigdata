import { MemberModule } from './../members/member.module';
import { PrismaService } from 'src/prisma.service';
import { NicknameHistoryController } from './nickname-history.controller';
import { Module } from '@nestjs/common';
import { NicknameHistoryServcie } from './nickname-history.service';

@Module({
  imports: [MemberModule],
  controllers: [NicknameHistoryController],
  providers: [NicknameHistoryServcie, PrismaService],
  exports: [NicknameHistoryServcie],
})
export class NicknameHistoryModule {}
