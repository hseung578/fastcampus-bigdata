import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { LEADERBOARD_KEY } from './constants/ranking.constant';

@Injectable()
export class RankingService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setScore(userId: string, score: number) {
    await this.redis.zadd(LEADERBOARD_KEY, score, userId);
  }

  async getRank(userId: string) {
    const result = await this.redis.zrevrank(LEADERBOARD_KEY, userId);
    if (result === null) throw new NotFoundException();
    return result + 1;
  }

  async getTopRank(limit: number) {
    return await this.redis.zrevrange(
      LEADERBOARD_KEY,
      0,
      limit - 1,
      'WITHSCORES',
    );
  }
}
