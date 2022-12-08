import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ListingsAndReviewsController } from './listings-and-reviews.controller';
import { ListingsAndReviewsService } from './listings-and-reviews.service';

@Module({
  controllers: [ListingsAndReviewsController],
  providers: [ListingsAndReviewsService, PrismaService],
})
export class ListingsAndReviewsModule {}
