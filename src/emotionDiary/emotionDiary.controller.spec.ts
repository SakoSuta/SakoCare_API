import { Test, TestingModule } from '@nestjs/testing';
import { EmotionDiaryController } from './emotionDiary.controller';
import { EmotionDiaryService } from './emotionDiary.service';
import { CreateEmotionDiaryDto } from './dto/create-emotion-diary.dto';
import { UpdateEmotionDiaryDto } from './dto/update-emotion-diary.dto';

describe('EmotionDiaryController', () => {
  let controller: EmotionDiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionDiaryController],
      providers: [
        {
          provide: EmotionDiaryService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              entry_date: new Date('2024-06-06'),
              energy_level: 5,
              stress_level: 2,
              social_level: 5,
              sleep_hours: 8,
              exercise_time: 45,
              description: 'Test description',
              is_favorite: true,
              tags: ['tag1', 'tag2'],
              user: { id: 1 },
              mood: { id: 1 },
              activity: { id: 1 },
            }),
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                entry_date: new Date('2024-06-06'),
                energy_level: 5,
                stress_level: 2,
                social_level: 5,
                sleep_hours: 8,
                exercise_time: 45,
                description: 'Test description',
                is_favorite: true,
                tags: ['tag1', 'tag2'],
                user: { id: 1 },
                mood: { id: 1 },
                activity: { id: 1 },
              },
            ]),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              entry_date: new Date('2024-06-06'),
              energy_level: 5,
              stress_level: 2,
              social_level: 5,
              sleep_hours: 8,
              exercise_time: 45,
              description: 'Test description',
              is_favorite: true,
              tags: ['tag1', 'tag2'],
              user: { id: 1 },
              mood: { id: 1 },
              activity: { id: 1 },
            }),
            update: jest.fn().mockResolvedValue({
              id: 1,
              entry_date: new Date('2024-06-06'),
              energy_level: 5,
              stress_level: 2,
              social_level: 5,
              sleep_hours: 8,
              exercise_time: 45,
              description: 'Updated description',
              is_favorite: true,
              tags: ['updated', 'productive'],
              user: { id: 1 },
              mood: { id: 1 },
              activity: { id: 1 },
            }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<EmotionDiaryController>(EmotionDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an emotion diary entry', async () => {
    const createEmotionDiaryDto: CreateEmotionDiaryDto = {
      user_id: 1,
      entry_date: new Date('2024-06-06'),
      mood_id: 1,
      energy_level: 5,
      stress_level: 2,
      social_level: 5,
      activity_id: 1,
      sleep_hours: 8,
      exercise_time: 45,
      description: 'Test description',
      is_favorite: true,
      tags: ['tag1', 'tag2'],
    };
    expect(await controller.create(createEmotionDiaryDto)).toEqual({
      id: 1,
      entry_date: new Date('2024-06-06'),
      energy_level: 5,
      stress_level: 2,
      social_level: 5,
      sleep_hours: 8,
      exercise_time: 45,
      description: 'Test description',
      is_favorite: true,
      tags: ['tag1', 'tag2'],
      user: { id: 1 },
      mood: { id: 1 },
      activity: { id: 1 },
    });
  });

  it('should return an array of emotion diary entries', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: 1,
        entry_date: new Date('2024-06-06'),
        energy_level: 5,
        stress_level: 2,
        social_level: 5,
        sleep_hours: 8,
        exercise_time: 45,
        description: 'Test description',
        is_favorite: true,
        tags: ['tag1', 'tag2'],
        user: { id: 1 },
        mood: { id: 1 },
        activity: { id: 1 },
      },
    ]);
  });

  it('should return a single emotion diary entry', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: 1,
      entry_date: new Date('2024-06-06'),
      energy_level: 5,
      stress_level: 2,
      social_level: 5,
      sleep_hours: 8,
      exercise_time: 45,
      description: 'Test description',
      is_favorite: true,
      tags: ['tag1', 'tag2'],
      user: { id: 1 },
      mood: { id: 1 },
      activity: { id: 1 },
    });
  });

  it('should update an emotion diary entry', async () => {
    const updateEmotionDiaryDto: UpdateEmotionDiaryDto = {
      description: 'Updated description',
      tags: ['updated', 'productive'],
    };
    expect(await controller.update('1', updateEmotionDiaryDto)).toEqual({
      id: 1,
      entry_date: new Date('2024-06-06'),
      energy_level: 5,
      stress_level: 2,
      social_level: 5,
      sleep_hours: 8,
      exercise_time: 45,
      description: 'Updated description',
      is_favorite: true,
      tags: ['updated', 'productive'],
      user: { id: 1 },
      mood: { id: 1 },
      activity: { id: 1 },
    });
  });

  it('should remove an emotion diary entry', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });
});
