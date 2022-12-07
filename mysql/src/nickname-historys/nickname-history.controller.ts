import { NicknameHistoryServcie } from './nickname-history.service';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MemberService } from 'src/members/member.service';

@Controller('nick')
@ApiTags('NicknameHistory API')
export class NicknameHistoryController {
  constructor(
    private readonly nicknameHistoryServcie: NicknameHistoryServcie,
    private readonly memberService: MemberService,
  ) {}

  @Get(':id')
  @ApiParam({
    example: 1,
    name: 'id',
  })
  async getNicknameHistory(@Param('id') id: number) {
    const member = await this.memberService.find(id);
    if (!member) {
      throw new NotFoundException();
    }
    return this.nicknameHistoryServcie.findAll(id);
  }
}
