import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class UpdateNickDto {
  @MaxLength(10)
  @ApiProperty({
    required: true,
    type: String,
    example: 'bob',
  })
  nickname: string;
}
