import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';

@Controller('movies')
@ApiTags('movies')
export class MovieController {
  constructor(private readonly moviceService: MovieService) {}

  @Get()
  getMovies() {
    return this.moviceService.find3();
  }

  @Get('/count')
  countMovie() {
    return this.moviceService.count();
  }
}
