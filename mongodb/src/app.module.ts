import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountModule } from './accounts/acount.module';
import { ListingsAndReviewsModule } from './listings-and-reviews/listings-and-reviews.module';
import { PlanetModule } from './planets/planet.module';
import { SaleModule } from './sales/sale.module';

@Module({
  imports: [AccountModule, ListingsAndReviewsModule, PlanetModule, SaleModule],
  controllers: [AppController],
})
export class AppModule {}
