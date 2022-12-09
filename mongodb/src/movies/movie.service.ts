import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async find1() {
    return await this.prisma.movies.findMany({
      select: { title: true, genres: true, runtime: true, rated: true },
    });
  }

  async find2() {
    return await this.prisma.movies.findMany({
      select: { title: true, genres: true, runtime: true, rated: true },
      where: { runtime: { lte: 100 } },
    });
  }

  async find3() {
    return await this.prisma.movies.findRaw({
      filter: { runtime: { $lte: 100 }, genres: { $in: ['Drama'] } },
      options: { limit: 50, sort: { runtime: 1 } },
    });
  }

  async count() {
    return await this.prisma.movies.count();
  }
}
