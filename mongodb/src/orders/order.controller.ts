import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@Controller('Orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder() {
    return this.orderService.create();
  }

  @Get('quantity')
  getQuantity() {
    return this.orderService.aggregate();
  }

  @Get('revenue')
  getRevenue() {
    return this.orderService.aggregateByDate();
  }
}
