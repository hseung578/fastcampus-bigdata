import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    return await this.prisma.orders.createMany({
      data: [
        {
          name: 'Pepperoni',
          size: 'small',
          price: 19,
          quantity: 10,
          date: new Date('2021-03-13T08:14:30Z'),
        },
        {
          name: 'Pepperoni',
          size: 'medium',
          price: 20,
          quantity: 20,
          date: new Date('2021-03-13T09:13:24Z'),
        },
        {
          name: 'Pepperoni',
          size: 'large',
          price: 21,
          quantity: 30,
          date: new Date('2021-03-17T09:22:12Z'),
        },
        {
          name: 'Cheese',
          size: 'small',
          price: 12,
          quantity: 15,
          date: new Date('2021-03-13T11:21:39Z'),
        },
        {
          name: 'Cheese',
          size: 'medium',
          price: 13,
          quantity: 50,
          date: new Date('2022-01-12T21:23:13Z'),
        },
        {
          name: 'Cheese',
          size: 'large',
          price: 14,
          quantity: 10,
          date: new Date('2022-01-12T05:08:13Z'),
        },
        {
          name: 'Vegan',
          size: 'small',
          price: 17,
          quantity: 10,
          date: new Date('2021-01-13T05:08:13Z'),
        },
        {
          name: 'Vegan',
          size: 'medium',
          price: 18,
          quantity: 10,
          date: new Date('2021-01-13T05:10:13Z'),
        },
      ],
    });
  }

  async aggregate() {
    return await this.prisma.orders.aggregateRaw({
      pipeline: [
        { $match: { size: 'medium' } },
        { $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } } },
      ],
    });
  }

  async aggregateByDate() {
    return await this.prisma.orders.aggregateRaw({
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    '$date',
                    {
                      $dateFromString: {
                        dateString: '2020-01-30',
                      },
                    },
                  ],
                },
                {
                  $lte: [
                    '$date',
                    {
                      $dateFromString: {
                        dateString: '2022-01-30',
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$date',
              },
            },
            totalOrderValue: {
              $sum: {
                $multiply: ['$price', '$quantity'],
              },
            },
            averageOrderQuantity: {
              $avg: '$quantity',
            },
          },
        },
        {
          $sort: {
            totalOrderValue: -1,
          },
        },
      ],
    });
  }
}
