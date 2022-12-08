import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListingsAndReviewsService } from './listings-and-reviews.service';

@Controller('listings-and-reviews')
@ApiTags('listings-and-reviews')
export class ListingsAndReviewsController {
  constructor(
    private readonly listingsAndReviewsService: ListingsAndReviewsService,
  ) {}

  @Get()
  getListingsAndReviews() {
    return this.listingsAndReviewsService.findAll();
  }
}
