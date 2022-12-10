import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SaleService } from './sale.service';

@Controller('sales')
@ApiTags('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  getSales() {
    return this.saleService.findAll();
  }

  @Get(':email')
  @ApiParam({
    name: 'email',
    type: String,
    required: true,
    example: 'keecade@hem.uy',
  })
  getSale(@Param('email') email: string) {
    return this.saleService.find(email);
  }
}
