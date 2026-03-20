import { Test, TestingModule } from '@nestjs/testing';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';

describe('ClubsController', () => {
  let controller: ClubsController;

  const mockClubsService = {
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubsController],
      providers: [
        {
          provide: ClubsService,
          useValue: mockClubsService,
        },
      ],
    }).compile();

    controller = module.get<ClubsController>(ClubsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return success message when club is soft deleted', async () => {
    const result = await controller.remove(12);

    expect(mockClubsService.remove).toHaveBeenCalledWith(12);
    expect(result).toEqual({
      success: true,
      message: 'Club deleted successfully',
    });
  });
});
