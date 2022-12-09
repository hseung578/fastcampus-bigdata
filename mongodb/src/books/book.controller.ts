import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';

@Controller('books')
@ApiTags('books')
export class BookController {
  constructor(private readonly bokService: BookService) {}

  @Post()
  createBook() {
    return this.bokService.create();
  }

  @Get('author')
  getAuthor() {
    return this.bokService.aggregateByAuthor();
  }

  @Get('author/document')
  getAuthorDocument() {
    return this.bokService.aggregateByAuthorWithDocument();
  }

  @Get('author/copies')
  getAuthorCopies() {
    return this.bokService.aggregateAddField();
  }
}
