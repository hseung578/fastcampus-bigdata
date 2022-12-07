import {
  GetPostsOffsetQuery,
  GetPostsCursortQuery,
} from './querys/get-posts.query';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreatePostByPullDto,
  CreatePostByPushDto,
} from './dtos/create-post.dto';

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

  async findAllByPullCursor(
    memberIds: number[],
    { cursor, limit }: GetPostsCursortQuery,
  ) {
    return await this.prisma.post.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
      where: { memberId: { in: memberIds } },
      orderBy: { id: 'asc' },
    });
  }

  async findAllByPushCursor(
    postIds: number[],
    { cursor, limit }: GetPostsCursortQuery,
  ) {
    return await this.prisma.post.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
      where: { id: { in: postIds } },
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

  async createByPull(dto: CreatePostByPullDto) {
    return await this.prisma.post.create({
      data: { ...dto, createDate: new Date() },
    });
  }

  async createByPush(members: number[], dto: CreatePostByPushDto) {
    const create = members.map((memberId) => {
      return {
        member: {
          connect: {
            id: memberId,
          },
        },
      };
    });
    return await this.prisma.post.create({
      data: {
        ...dto,
        createDate: new Date(),
        timelines: { create },
      },
    });
  }

  async count() {
    return await this.prisma.post.count();
  }
}
