import { TimelineService } from './../timelines/timeline.service';
import {
  CreatePostByPullDto,
  CreatePostByPushDto,
} from './dtos/create-post.dto';
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
    private readonly timelineService: TimelineService,
  ) {}

  @Post('pull')
  createPostByPull(@Body() dto: CreatePostByPullDto) {
    return this.postService.createByPull(dto);
  }

  @Post('push')
  async createPostByPush(@Body() dto: CreatePostByPushDto) {
    const followers = await this.followService.findAllwithToId(dto.memberId);
    const memberIdList = followers.map((follower) => follower.fromMemberId);
    return this.postService.createByPush(memberIdList, dto);
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
    return this.postService.findAllByPullCursor([memberId], { ...queryParams });
  }

  @Get('members/:memberId/timelines/pull')
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
  async getTimelinesByPull(
    @Param('memberId') memberId: number,
    @Query() queryParams: GetPostsCursortQuery,
  ) {
    const followings = await this.followService.findAllwithFromId(memberId);
    const memberIdList = followings.map((following) => following.toMemberId);
    return this.postService.findAllByPullCursor(memberIdList, {
      ...queryParams,
    });
  }

  @Get('members/:memberId/timelines/push')
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
  async getTimelinesByPush(
    @Param('memberId') memberId: number,
    @Query() queryParams: GetPostsCursortQuery,
  ) {
    const timelines = await this.timelineService.findAll(memberId);
    const posts = timelines.map((timeline) => timeline.postId);
    return this.postService.findAllByPushCursor(posts, { ...queryParams });
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
