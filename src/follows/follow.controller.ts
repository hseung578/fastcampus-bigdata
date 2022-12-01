import { MemberService } from 'src/members/member.service';
import { FollowService } from './follow.service';
import {
  Controller,
  Param,
  Post,
  NotFoundException,
  ConflictException,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('follow')
@ApiTags('Follow')
export class FollowController {
  constructor(
    private readonly followService: FollowService,
    private readonly memberService: MemberService,
  ) {}

  @Post(':fromId/:toId')
  async follow(@Param('fromId') fromId: number, @Param('toId') toId: number) {
    const fromMember = await this.memberService.find(fromId);
    const toMember = await this.memberService.find(toId);
    if (!fromMember) throw new NotFoundException();
    if (!toMember) throw new NotFoundException();

    if (fromId === toId) throw new ConflictException();

    const follow = await this.followService.find(fromId, toId);
    if (follow) throw new ConflictException();

    return this.followService.creat(fromId, toId);
  }

  @Get('member/:fromId')
  getFollows(@Param('fromId') fromId: number) {
    return this.followService.findAll(fromId);
  }
}
