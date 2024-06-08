import { Test, TestingModule } from '@nestjs/testing';
import { EmotionDiaryController } from './EmotionDiary.controller';
import { EmotionDiaryService } from './EmotionDiary.service';
import { CreateEmotionDiaryDto } from './dto/create-emotion-diary.dto';

describe('EmotionDiaryController', () => {
  let controller: EmotionDiaryController;

  const mockEmotionDiaryService = {
    create: jest.fn((dto: CreateEmotionDiaryDto) => {
      return {
        ...dto,
        journal_id: Date.now(),
      };
    }),
    findAll: jest.fn(() => {
      return [
        {
          journal_id: 1,
          user_id: 1,
          entry_date: new Date(),
          mood_id: 2,
          energy_level: 5,
          stress_level: 3,
          social_level: 4,
          activity_type: 1,
          sleep_hours: 7.5,
          exercise_time: 30,
          description: 'Today was a good day!',
          is_favorite: false,
          tags: ['happy', 'productive'],
        },
      ];
    }),
    findOne: jest.fn((id: number) => {
      return {
        journal_id: id,
        user_id: 1,
        entry_date: new Date(),
        mood_id: 2,
        energy_level: 5,
        stress_level: 3,
        social_level: 4,
        activity_type: 1,
        sleep_hours: 7.5,
        exercise_time: 30,
        description: 'Today was a good day!',
        is_favorite: false,
        tags: ['happy', 'productive'],
      };
    }),
    update: jest.fn((id: number, dto: CreateEmotionDiaryDto) => {
      return {
        journal_id: id,
        ...dto,
      };
    }),
    remove: jest.fn(() => {
      return;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionDiaryController],
      providers: [
        {
          provide: EmotionDiaryService,
          useValue: mockEmotionDiaryService,
        },
      ],
    }).compile();

    controller = module.get<EmotionDiaryController>(EmotionDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new diary entry', async () => {
    const dto: CreateEmotionDiaryDto = {
      user_id: 1,
      entry_date: new Date(),
      mood_id: 2,
      energy_level: 5,
      stress_level: 3,
      social_level: 4,
      activity_type: 1,
      sleep_hours: 7.5,
      exercise_time: 30,
      description: 'Today was a good day!',
      is_favorite: false,
      tags: ['happy', 'productive'],
    };

    expect(await controller.create(dto)).toEqual({
      journal_id: expect.any(Number),
      ...dto,
    });
    expect(mockEmotionDiaryService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all diary entries', async () => {
    expect(await controller.findAll()).toEqual([
      {
        journal_id: 1,
        user_id: 1,
        entry_date: expect.any(Date),
        mood_id: 2,
        energy_level: 5,
        stress_level: 3,
        social_level: 4,
        activity_type: 1,
        sleep_hours: 7.5,
        exercise_time: 30,
        description: 'Today was a good day!',
        is_favorite: false,
        tags: ['happy', 'productive'],
      },
    ]);
    expect(mockEmotionDiaryService.findAll).toHaveBeenCalled();
  });

  it('should return a single diary entry', async () => {
    const id = 1;
    expect(await controller.findOne(id.toString())).toEqual({
      journal_id: id,
      user_id: 1,
      entry_date: expect.any(Date),
      mood_id: 2,
      energy_level: 5,
      stress_level: 3,
      social_level: 4,
      activity_type: 1,
      sleep_hours: 7.5,
      exercise_time: 30,
      description: 'Today was a good day!',
      is_favorite: false,
      tags: ['happy', 'productive'],
    });
    expect(mockEmotionDiaryService.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a diary entry', async () => {
    const id = 1;
    const dto: CreateEmotionDiaryDto = {
      user_id: 1,
      entry_date: new Date(),
      mood_id: 2,
      energy_level: 5,
      stress_level: 3,
      social_level: 4,
      activity_type: 1,
      sleep_hours: 7.5,
      exercise_time: 30,
      description: 'Today was a good day!',
      is_favorite: false,
      tags: ['happy', 'productive'],
    };

    expect(await controller.update(id.toString(), dto)).toEqual({
      journal_id: id,
      ...dto,
    });
    expect(mockEmotionDiaryService.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove a diary entry', async () => {
    const id = 1;
    await controller.remove(id.toString());
    expect(mockEmotionDiaryService.remove).toHaveBeenCalledWith(id);
  });
});
