import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from '../entity/activity.entity';

describe('ActivityController', () => {
  let activityController: ActivityController;
  let activityService: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        {
          provide: ActivityService,
          useValue: {
            create: jest.fn().mockResolvedValue(new Activity()),
            findAll: jest.fn().mockResolvedValue([new Activity()]),
            findOne: jest.fn().mockResolvedValue(new Activity()),
            update: jest.fn().mockResolvedValue(new Activity()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    activityController = module.get<ActivityController>(ActivityController);
    activityService = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(activityController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new activity', async () => {
      const createActivityDto: CreateActivityDto = { activityType: 'Running' };
      const result = await activityController.create(createActivityDto);
      expect(result).toBeInstanceOf(Activity);
      expect(activityService.create).toHaveBeenCalledWith(createActivityDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of activities', async () => {
      const result = await activityController.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(activityService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single activity', async () => {
      const id = '1';
      const result = await activityController.findOne(id);
      expect(result).toBeInstanceOf(Activity);
      expect(activityService.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update an activity', async () => {
      const id = '1';
      const updateActivityDto: UpdateActivityDto = { activityType: 'Swimming' };
      const result = await activityController.update(id, updateActivityDto);
      expect(result).toBeInstanceOf(Activity);
      expect(activityService.update).toHaveBeenCalledWith(
        +id,
        updateActivityDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove an activity', async () => {
      const id = '1';
      const result = await activityController.remove(id);
      expect(result).toBeUndefined();
      expect(activityService.remove).toHaveBeenCalledWith(+id);
    });
  });
});
