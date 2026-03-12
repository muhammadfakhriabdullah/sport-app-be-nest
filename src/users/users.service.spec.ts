import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOneBy: jest.Mock;
    findOne: jest.Mock;
    createQueryBuilder: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(async () => {
    repository = {
      create: jest.fn((data) => data),
      save: jest.fn(async (data) => data),
      find: jest.fn(),
      findOneBy: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash password on create', async () => {
    const plainPassword = 'Password123!';
    const created = await service.create({
      email: 'demo@test.com',
      username: 'demo',
      password: plainPassword,
    });

    expect(created.password).not.toBe(plainPassword);
    expect(created.password).toMatch(/^\$2[aby]\$/);
  });

  it('should hash password on update', async () => {
    const plainPassword = 'Password123!';
    await service.update('user-id', { password: plainPassword });

    const payload = repository.update.mock.calls[0][1] as { password: string };

    expect(payload.password).not.toBe(plainPassword);
    expect(payload.password).toMatch(/^\$2[aby]\$/);
  });
});
