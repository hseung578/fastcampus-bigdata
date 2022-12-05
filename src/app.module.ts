import { Module, CacheModule, CacheStore } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { AppController } from './app.controller';
import { MemberModule } from './members/member.module';
import { FollowModule } from './follows/follow.module';
import { PostModule } from './posts/post.module';
import { NicknameHistoryModule } from './nickname-historys/nickname-history.module';
import { TimelineModule } from './timelines/timeline.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    CacheModule.register<RedisClientOptions>({
      store: redisStore as unknown as CacheStore,
      url: 'redis://localhost:6379',
      isGlobal: true,
    }),
    MemberModule,
    NicknameHistoryModule,
    FollowModule,
    PostModule,
    TimelineModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
