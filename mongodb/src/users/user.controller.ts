import { CreateUserDto } from './dtos/create-user.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('/users')
@ApiTags('Userr')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    example: 1,
    name: 'id',
  })
  getUser(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
