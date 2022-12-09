import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService],
})
export class BookModule {}
