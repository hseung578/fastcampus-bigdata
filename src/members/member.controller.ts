import { CreateMemberDto } from './dtos/create-member.dto';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { UpdateNickDto } from './dtos/update-nick.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('/members')
@ApiTags('Member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  getMembers() {
    return this.memberService.findAll();
  }

  @Get(':id')
  @ApiParam({
    example: 1,
    name: 'id',
  })
  getMember(@Param('id') id: number) {
    return this.memberService.find(id);
  }

  @Post()
  createMember(@Body() dto: CreateMemberDto) {
    return this.memberService.create(dto);
  }

  @Patch(':id/nick')
  @ApiParam({
    example: 1,
    name: 'id',
  })
  async changeNick(@Param('id') id: number, @Body() dto: UpdateNickDto) {
    const member = await this.memberService.find(id);
    if (!member) {
      throw new NotFoundException();
    }
    if (dto.nickname === member.nickname) {
      throw new ConflictException();
    }
    await this.memberService.update(id, dto);
    return true;
  }
}
