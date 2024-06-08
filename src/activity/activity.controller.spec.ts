import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

describe('ActivityController', () => {
  let controller: ActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        {
          provide: ActivityService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: 1, activityType: 'Read' }),
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: 1, activityType: 'Read' }]),
            findOne: jest
              .fn()
              .mockResolvedValue({ id: 1, activityType: 'Read' }),
            update: jest
              .fn()
              .mockResolvedValue({ id: 1, activityType: 'Updated Activity' }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an activity', async () => {
    const createActivityDto: CreateActivityDto = { activityType: 'Read' };
    expect(await controller.create(createActivityDto)).toEqual({
      id: 1,
      activityType: 'Read',
    });
  });

  it('should return an array of activities', async () => {
    expect(await controller.findAll()).toEqual([
      { id: 1, activityType: 'Read' },
    ]);
  });

  it('should return a single activity', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: 1,
      activityType: 'Read',
    });
  });

  it('should update an activity', async () => {
    const updateActivityDto: UpdateActivityDto = {
      activityType: 'Updated Activity',
    };
    expect(await controller.update('1', updateActivityDto)).toEqual({
      id: 1,
      activityType: 'Updated Activity',
    });
  });

  it('should remove an activity', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });
});
