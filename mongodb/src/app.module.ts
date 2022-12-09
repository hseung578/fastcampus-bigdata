import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountModule } from './accounts/acount.module';
import { ListingsAndReviewsModule } from './listings-and-reviews/listings-and-reviews.module';
import { PlanetModule } from './planets/planet.module';
import { SaleModule } from './sales/sale.module';
import { ShoppingModule } from './shoppings/shopping.module';
import { MovieModule } from './movies/movie.module';
import { OrderModule } from './orders/order.module';
import { BookModule } from './books/book.module';

@Module({
  imports: [
    AccountModule,
    ListingsAndReviewsModule,
    PlanetModule,
    SaleModule,
    ShoppingModule,
    MovieModule,
    OrderModule,
    BookModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
