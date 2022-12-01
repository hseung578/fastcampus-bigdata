import { CreatePostDto } from './dtos/create-post.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get('/daily-count')
  @ApiQuery({
    name: 'id',
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
    @Query('id') id: number,
    @Query('start') start: Date,
    @Query('end') end: Date,
  ) {
    return this.postService.findDaily(id, start, end);
  }

  @Get('count')
  countPost() {
    return this.postService.count();
  }
}
