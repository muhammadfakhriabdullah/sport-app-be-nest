import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from './profiles.entity';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;

  const mockProfileRepository = {
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getRepositoryToken(Profile),
          useValue: mockProfileRepository,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should soft delete profile by id', async () => {
    mockProfileRepository.softDelete.mockResolvedValue({ affected: 1 });

    await service.remove(10);

    expect(mockProfileRepository.softDelete).toHaveBeenCalledWith(10);
  });

  it('should throw not found when profile does not exist', async () => {
    mockProfileRepository.softDelete.mockResolvedValue({ affected: 0 });

    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
