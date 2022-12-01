import { CreateMemberDto } from './../dtos/create-member.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from '../member.controller';
import { MemberService } from '../member.service';
import { Member } from '@prisma/client';

describe('MemberController', () => {
  let controller: MemberController;

  const mockMemberService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
        createdAt: new Date(),
      };
    }),
    update: jest.fn(),
    find: jest.fn((id) => {
      return {
        id: id,
        email: 'aaa@naver.com',
        nickname: 'nick',
        birthday: new Date(1999, 1, 1),
        createdAt: new Date(),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    })
      .overrideProvider(MemberService)
      .useValue(mockMemberService)
      .compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a member', () => {
    const input: CreateMemberDto = {
      email: 'aaa@naver.com',
      nickname: 'nick',
      birthday: new Date(1999, 1, 1),
    };
    const output: Member = {
      id: expect.any(Number),
      email: 'aaa@naver.com',
      nickname: 'nick',
      birthday: new Date(1999, 1, 1),
      createdAt: new Date(),
    };
    expect(controller.createMember(input)).toEqual(output);
    expect(mockMemberService.create).toHaveBeenCalledWith(input);
  });

  it('should update a nickname', () => {
    const dto = { nickname: 'bob' };
    expect(controller.changeNick(1, dto)).toEqual({});
    expect(mockMemberService.update).toHaveBeenCalled();
  });
});
