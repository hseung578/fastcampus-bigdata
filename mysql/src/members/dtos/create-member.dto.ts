import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, MaxLength } from 'class-validator';

export class CreateMemberDto {
  @IsEmail()
  @ApiProperty({
    required: true,
    type: String,
    example: 'aaa@naver.com',
  })
  email: string;

  @MaxLength(10)
  @ApiProperty({
    required: true,
    type: String,
    example: 'nick',
  })
  nickname: string;

  @IsDate()
  @ApiProperty({
    required: true,
    type: Date,
    example: '1999-01-01',
  })
  birthday: Date;
}
