import { Test, TestingModule } from '@nestjs/testing';
import { UserResourcesController } from './userResources.controller';
import { UserResourcesService } from './userResources.service';
import { RecommendResourcesDto } from './dto/recommend-resources.dto';
import { UpdateUserResourceDto } from './dto/update-user-resource.dto';
import { UserResources } from '../entity/userResources.entity';

describe('UserResourcesController', () => {
  let userResourcesController: UserResourcesController;
  let userResourcesService: UserResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResourcesController],
      providers: [
        {
          provide: UserResourcesService,
          useValue: {
            recommendResources: jest.fn().mockResolvedValue([]),
            findAll: jest.fn().mockResolvedValue([new UserResources()]),
            findOne: jest.fn().mockResolvedValue(new UserResources()),
            update: jest.fn().mockResolvedValue(new UserResources()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userResourcesController = module.get<UserResourcesController>(
      UserResourcesController,
    );
    userResourcesService =
      module.get<UserResourcesService>(UserResourcesService);
  });

  it('should be defined', () => {
    expect(userResourcesController).toBeDefined();
  });

  describe('recommendResources', () => {
    it('should recommend resources', async () => {
      const recommendResourcesDto: RecommendResourcesDto = {
        userId: 1,
        startDate: '2023-07-01',
        endDate: '2023-07-31',
      };
      const result = await userResourcesController.recommendResources(
        recommendResourcesDto,
      );
      expect(result).toEqual([]);
      expect(userResourcesService.recommendResources).toHaveBeenCalledWith(
        recommendResourcesDto.userId,
        new Date(recommendResourcesDto.startDate),
        new Date(recommendResourcesDto.endDate),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of user resources', async () => {
      const result = await userResourcesController.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(userResourcesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user resource', async () => {
      const id = 1;
      const result = await userResourcesController.findOne(id);
      expect(result).toBeInstanceOf(UserResources);
      expect(userResourcesService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a user resource', async () => {
      const id = 1;
      const updateUserResourceDto: UpdateUserResourceDto = {
        userId: 2,
        resourceId: 3,
        category: 'exercise',
      };
      const result = await userResourcesController.update(
        id,
        updateUserResourceDto,
      );
      expect(result).toBeInstanceOf(UserResources);
      expect(userResourcesService.update).toHaveBeenCalledWith(
        id,
        updateUserResourceDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user resource', async () => {
      const id = 1;
      const result = await userResourcesController.remove(id);
      expect(result).toBeUndefined();
      expect(userResourcesService.remove).toHaveBeenCalledWith(id);
    });
  });
});
