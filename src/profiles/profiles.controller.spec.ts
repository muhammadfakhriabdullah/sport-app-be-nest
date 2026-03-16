import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

describe('ProfilesController', () => {
  let controller: ProfilesController;

  const mockProfilesService = {
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        {
          provide: ProfilesService,
          useValue: mockProfilesService,
        },
      ],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return success message when profile is soft deleted', async () => {
    const result = await controller.remove(12);

    expect(mockProfilesService.remove).toHaveBeenCalledWith(12);
    expect(result).toEqual({
      success: true,
      message: 'Profile deleted successfully',
    });
  });
});
