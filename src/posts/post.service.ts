import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findDaily(id: number, start: Date, end: Date) {
    end.setHours(end.getHours() + 24);

    return await this.prisma.post.groupBy({
      by: ['memberId', 'createDate'],
      where: {
        memberId: id,
        createdAt: { gte: start, lt: end },
      },
      _count: {
        _all: true,
      },
    });
  }

  async create(dto: CreatePostDto) {
    return await this.prisma.post.create({
      data: { ...dto, createDate: new Date() },
    });
  }

  async count() {
    return await this.prisma.post.count();
  }
}
