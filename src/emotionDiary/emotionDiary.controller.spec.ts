import { Test, TestingModule } from '@nestjs/testing';
import { EmotionDiaryController } from './emotionDiary.controller';
import { EmotionDiaryService } from './emotionDiary.service';
import { CreateEmotionDiaryDto } from './dto/create-emotion-diary.dto';
import { UpdateEmotionDiaryDto } from './dto/update-emotion-diary.dto';
import { EmotionalJournal } from '../entity/emotionalJournal.entity';

describe('EmotionDiaryController', () => {
  let emotionDiaryController: EmotionDiaryController;
  let emotionDiaryService: EmotionDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionDiaryController],
      providers: [
        {
          provide: EmotionDiaryService,
          useValue: {
            create: jest.fn().mockResolvedValue(new EmotionalJournal()),
            findAll: jest.fn().mockResolvedValue([new EmotionalJournal()]),
            findOne: jest.fn().mockResolvedValue(new EmotionalJournal()),
            update: jest.fn().mockResolvedValue(new EmotionalJournal()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    emotionDiaryController = module.get<EmotionDiaryController>(
      EmotionDiaryController,
    );
    emotionDiaryService = module.get<EmotionDiaryService>(EmotionDiaryService);
  });

  it('should be defined', () => {
    expect(emotionDiaryController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new emotional journal entry', async () => {
      const createEmotionDiaryDto: CreateEmotionDiaryDto = {
        user_id: 1,
        entry_date: new Date(),
        mood_id: 1,
        energy_level: 3,
        stress_level: 2,
        social_level: 4,
        activity_id: [1, 2],
        sleep_hours: 7,
        exercise_time: 1,
        description: 'Feeling good',
        is_favorite: true,
      };
      const result = await emotionDiaryController.create(createEmotionDiaryDto);
      expect(result).toBeInstanceOf(EmotionalJournal);
      expect(emotionDiaryService.create).toHaveBeenCalledWith(
        createEmotionDiaryDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of emotional journal entries', async () => {
      const result = await emotionDiaryController.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(emotionDiaryService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single emotional journal entry', async () => {
      const id = '1';
      const result = await emotionDiaryController.findOne(id);
      expect(result).toBeInstanceOf(EmotionalJournal);
      expect(emotionDiaryService.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update an emotional journal entry', async () => {
      const id = '1';
      const updateEmotionDiaryDto: UpdateEmotionDiaryDto = {
        mood_id: 2,
        description: 'Updated feeling',
      };
      const result = await emotionDiaryController.update(
        id,
        updateEmotionDiaryDto,
      );
      expect(result).toBeInstanceOf(EmotionalJournal);
      expect(emotionDiaryService.update).toHaveBeenCalledWith(
        +id,
        updateEmotionDiaryDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove an emotional journal entry', async () => {
      const id = '1';
      const result = await emotionDiaryController.remove(id);
      expect(result).toBeUndefined();
      expect(emotionDiaryService.remove).toHaveBeenCalledWith(+id);
    });
  });
});
