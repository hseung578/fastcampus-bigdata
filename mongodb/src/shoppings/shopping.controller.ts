import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ShoppingService } from './shopping.service';

@Controller('Shoppings')
@ApiTags('Shoppings')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  @Post()
  createShopping() {
    return this.shoppingService.create();
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      properties: {
        item: {
          type: 'string',
          example: 'beer',
        },
      },
    },
  })
  updateShopping(@Param('id') id: string, @Body() item: string) {
    return this.shoppingService.update(id, item);
  }
}
