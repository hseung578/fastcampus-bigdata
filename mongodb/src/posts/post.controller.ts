import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}
}
