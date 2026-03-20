import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Club } from './clubs.entity';
import { ClubsService } from './clubs.service';

describe('ClubsService', () => {
  let service: ClubsService;

  const mockClubRepository = {
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubsService,
        {
          provide: getRepositoryToken(Club),
          useValue: mockClubRepository,
        },
      ],
    }).compile();

    service = module.get<ClubsService>(ClubsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should soft delete club by organization id', async () => {
    mockClubRepository.softDelete.mockResolvedValue({ affected: 1 });

    await service.remove(10);

    expect(mockClubRepository.softDelete).toHaveBeenCalledWith({
      organization_id: 10,
    });
  });

  it('should throw not found when club does not exist', async () => {
    mockClubRepository.softDelete.mockResolvedValue({ affected: 0 });

    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
