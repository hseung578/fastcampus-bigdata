import { IsInt, IsOptional } from 'class-validator';

export class GetPostsOffsetQuery {
  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  limit: number;
}

export class GetPostsCursortQuery {
  @IsInt()
  @IsOptional()
  cursor?: number;

  @IsInt()
  limit: number;
}
