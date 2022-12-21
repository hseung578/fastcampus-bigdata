import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_SECOND)
  async saveLikeCount(): Promise<void> {
    const now = new Date();
    const posts = await this.prisma.like.groupBy({
      by: ['postId'],
      where: {
        createdAt: {
          gte: new Date(now.setSeconds(now.getSeconds() - 1)),
        },
      },
      _count: true,
    });

    Promise.all(
      posts.map((post) => {
        this.prisma.post.update({
          where: { id: post.postId },
          data: { likeCount: { increment: post._count } },
        }),
          this.logger.log(`No.${post.postId} post + ${post._count} likes`);
      }),
    );
  }
}
