import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SaleService } from './sale.service';

@Controller('sales')
@ApiTags('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}
}
