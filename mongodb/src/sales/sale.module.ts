import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  controllers: [SaleController],
  providers: [SaleService, PrismaService],
})
export class SaleModule {}
