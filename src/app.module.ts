import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MemberModule } from './members/member.module';
import { FollowModule } from './follows/follow.module';
import { PostModule } from './posts/post.module';
import { NicknameHistoryModule } from './nickname-historys/nickname-history.module';

@Module({
  imports: [MemberModule, NicknameHistoryModule, FollowModule, PostModule],
  controllers: [AppController],
})
export class AppModule {}
