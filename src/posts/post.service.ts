import {
  GetPostsOffsetQuery,
  GetPostsCursortQuery,
} from './querys/get-posts.query';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByOffset(
    memberId: number,
    { page, limit }: GetPostsOffsetQuery,
  ) {
    return await this.prisma.post.findMany({
      take: limit,
      skip: page ? (page - 1) * limit : 0,
      where: { memberId },
      orderBy: { createDate: 'asc' },
    });
  }

  async findAllByCursor(
    memberId: number[],
    { cursor, limit }: GetPostsCursortQuery,
  ) {
    return await this.prisma.post.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
      where: { memberId: { in: memberId } },
      orderBy: { id: 'asc' },
    });
  }

  async findDaily(memberId: number, start: Date, end: Date) {
    return await this.prisma.post.groupBy({
      by: ['memberId', 'createDate'],
      where: {
        memberId: memberId,
        createDate: { gte: start, lte: end },
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
