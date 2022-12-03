import { TimelineModule } from './../timelines/timeline.module';
import { FollowModule } from './../follows/follow.module';
import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [FollowModule, TimelineModule],
  controllers: [PostController],
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
