import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppController } from './app.controller';
import { MemberModule } from './members/member.module';
import { FollowModule } from './follows/follow.module';
import { PostModule } from './posts/post.module';
import { NicknameHistoryModule } from './nickname-historys/nickname-history.module';
import { TimelineModule } from './timelines/timeline.module';
import { LikeModule } from './likes/like.module';
import { TaskModule } from './tasks/task.module';
import { RankingModule } from './rankings/ranking.module';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: 'redis://localhost:6379',
      },
    }),
    MemberModule,
    NicknameHistoryModule,
    FollowModule,
    PostModule,
    TimelineModule,
    LikeModule,
    TaskModule,
    RankingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
