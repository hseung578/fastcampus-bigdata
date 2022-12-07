import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }
}
