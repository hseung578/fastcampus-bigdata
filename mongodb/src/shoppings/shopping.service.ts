import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShoppingService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    return await this.prisma.$runCommandRaw({
      insert: 'shopping',
      documents: [
        {
          cart: ['banana', 'cheeze', 'milk'],
          coupons: ['10%', '20%', '30%'],
        },
        { cart: [], coupons: [] },
      ],
    });
  }

  async update(id: string, item: string) {
    const shopping = await this.prisma.shopping.findFirst({
      where: { id },
    });
    shopping?.cart.push(item['item']);

    return await this.prisma.shopping.update({
      where: { id },
      data: { cart: shopping?.cart },
    });
  }
}
