import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreatePostByPullDto {
  @IsInt()
  @ApiProperty({
    required: true,
    type: Number,
    example: 1,
  })
  memberId: number;

  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    example: 'contents',
  })
  contents: string;
}

export class CreatePostByPushDto {
  @IsInt()
  @ApiProperty({
    required: true,
    type: Number,
    example: 1,
  })
  memberId: number;

  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    example: 'contents',
  })
  contents: string;
}
