import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.sales.findMany({
      take: 20,
    });
  }

  async find(email: string) {
    return await this.prisma.sales.findFirst({
      where: { customer: { is: { email } } },
    });
  }
}
