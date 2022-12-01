import { CreateMemberDto } from './dtos/create-member.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateNickDto } from './dtos/update-nick.dto';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: number) {
    return await this.prisma.member.findUnique({ where: { id } });
  }

  async findAll() {
    return await this.prisma.member.findMany();
  }

  async create(dto: CreateMemberDto) {
    return await this.prisma.member.create({
      data: { ...dto, nicknames: { create: { nickname: dto.nickname } } },
    });
  }

  async update(id: number, dto: UpdateNickDto) {
    return await this.prisma.member.update({
      where: { id },
      data: { ...dto, nicknames: { create: { ...dto } } },
    });
  }
}
