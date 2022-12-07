import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    required: true,
    type: String,
    example: 'aaa@naver.com',
  })
  email: string;
}
