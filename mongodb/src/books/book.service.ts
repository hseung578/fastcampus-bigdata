import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    return await this.prisma.books.createMany({
      data: [
        { title: 'The Banquet', author: 'Dante', copies: 2 },
        { title: 'Divine Comedy', author: 'Dante', copies: 1 },
        { title: 'Eclogues', author: 'Dante', copies: 2 },
        { title: 'The Odyssey', author: 'Homer', copies: 10 },
        { title: 'Iliad', author: 'Homer', copies: 10 },
      ],
    });
  }

  async aggregateByAuthor() {
    return await this.prisma.books.aggregateRaw({
      pipeline: [{ $group: { _id: '$author', books: { $push: '$title' } } }],
    });
  }

  async aggregateByAuthorWithDocument() {
    return await this.prisma.books.aggregateRaw({
      pipeline: [{ $group: { _id: '$author', books: { $push: '$$ROOT' } } }],
    });
  }

  async aggregateAddField() {
    return await this.prisma.books.aggregateRaw({
      pipeline: [
        { $group: { _id: '$author', books: { $push: '$$ROOT' } } },
        { $addFields: { totalCopies: { $sum: '$books.copies' } } },
      ],
    });
  }
}
