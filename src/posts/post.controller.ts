import { CreatePostDto } from './dtos/create-post.dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import {
  GetPostsCursortQuery,
  GetPostsOffsetQuery,
} from './querys/get-posts.query';
import { FollowService } from 'src/follows/follow.service';

@Controller('posts')
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly followService: FollowService,
  ) {}

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get('members/:memberId')
  @ApiParam({
    name: 'memberId',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: true,
    example: 10,
  })
  getPostsByOffset(
    @Param('memberId') memberId: number,
    @Query() queryParams: GetPostsOffsetQuery,
  ) {
    return this.postService.findAllByOffset(memberId, { ...queryParams });
  }

  @Get('members/:memberId/cursor')
  @ApiParam({
    name: 'memberId',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiQuery({
    name: 'cursor',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: true,
    example: 10,
  })
  getPostsByCursor(
    @Param('memberId') memberId: number,
    @Query() queryParams: GetPostsCursortQuery,
  ) {
    return this.postService.findAllByCursor([memberId], { ...queryParams });
  }

  @Get('members/:memberId/timelines')
  @ApiParam({
    name: 'memberId',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiQuery({
    name: 'cursor',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: true,
    example: 10,
  })
  async getTimelines(
    @Param('memberId') memberId: number,
    @Query() queryParams: GetPostsCursortQuery,
  ) {
    const follow = await this.followService.findAll(memberId);
    const memberIdList = follow.map((follow) => follow.toMemberId);
    return this.postService.findAllByCursor(memberIdList, { ...queryParams });
  }

  @Get('/daily-count')
  @ApiQuery({
    name: 'memberId',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiQuery({
    name: 'start',
    type: Date,
    required: true,
    example: '2022-12-01',
  })
  @ApiQuery({
    name: 'end',
    type: Date,
    required: true,
    example: '2022-12-01',
  })
  getDailyPosts(
    @Query('memberId') memberId: number,
    @Query('start') start: Date,
    @Query('end') end: Date,
  ) {
    return this.postService.findDaily(memberId, start, end);
  }

  @Get('count')
  countPost() {
    return this.postService.count();
  }
}
