import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RankingService } from './ranking.service';

@Controller('rankings')
@ApiTags('Ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  getTopRanks(@Query('top') top: number) {
    return this.rankingService.getTopRank(top);
  }

  @Get('users/:userId')
  getRank(@Param('userId') userId: string) {
    return this.rankingService.getRank(userId);
  }

  @Post('users/:userId/score')
  @ApiBody({
    schema: {
      properties: {
        score: { type: 'number' },
      },
    },
  })
  async setScore(
    @Param('userId') userId: string,
    @Body('score') score: number,
  ) {
    await this.rankingService.setScore(userId, score);
    return true;
  }
}
