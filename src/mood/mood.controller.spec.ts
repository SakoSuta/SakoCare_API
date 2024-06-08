import { Test, TestingModule } from '@nestjs/testing';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';

describe('MoodController', () => {
  let controller: MoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodController],
      providers: [
        {
          provide: MoodService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'Happy', type: 'Positive' }),
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: 1, name: 'Happy', type: 'Positive' }]),
            findOne: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'Happy', type: 'Positive' }),
            update: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Updated Mood',
              type: 'Positive',
            }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<MoodController>(MoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a mood', async () => {
    const createMoodDto: CreateMoodDto = { name: 'Happy', type: 'Positive' };
    expect(await controller.create(createMoodDto)).toEqual({
      id: 1,
      name: 'Happy',
      type: 'Positive',
    });
  });

  it('should return an array of moods', async () => {
    expect(await controller.findAll()).toEqual([
      { id: 1, name: 'Happy', type: 'Positive' },
    ]);
  });

  it('should return a single mood', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: 1,
      name: 'Happy',
      type: 'Positive',
    });
  });

  it('should update a mood', async () => {
    const updateMoodDto: UpdateMoodDto = { name: 'Updated Mood' };
    expect(await controller.update('1', updateMoodDto)).toEqual({
      id: 1,
      name: 'Updated Mood',
      type: 'Positive',
    });
  });

  it('should remove a mood', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });
});
