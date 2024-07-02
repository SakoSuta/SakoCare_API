import { Test, TestingModule } from '@nestjs/testing';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { AuthGuard } from '../guard/auth.guard';
import { AdminGuard } from '../guard/admin.guard';
import { AuthService } from '../auth/auth.service';

describe('MoodController', () => {
  let moodController: MoodController;
  let moodService: MoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodController],
      providers: [
        {
          provide: MoodService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1, name: 'Happy' }),
            findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Happy' }]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Happy' }),
            update: jest.fn().mockResolvedValue({ id: 1, name: 'Sad' }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: AuthService,
          useValue: {
            verifyToken: jest.fn().mockResolvedValue({ id: 1, isAdmin: true }),
            isAdmin: jest.fn().mockResolvedValue(true),
          },
        },
        AuthGuard,
        AdminGuard,
      ],
    }).compile();

    moodController = module.get<MoodController>(MoodController);
    moodService = module.get<MoodService>(MoodService);
  });

  it('should be defined', () => {
    expect(moodController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new mood', async () => {
      const createMoodDto = {
        name: 'Happy',
        type: 'Positive',
        color: 'Yellow',
      };
      const result = await moodController.create(createMoodDto);
      expect(result).toEqual({ id: 1, name: 'Happy' });
      expect(moodService.create).toHaveBeenCalledWith(createMoodDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of moods', async () => {
      const result = await moodController.findAll();
      expect(result).toEqual([{ id: 1, name: 'Happy' }]);
      expect(moodService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single mood', async () => {
      const id = 1;
      const result = await moodController.findOne(id.toString());
      expect(result).toEqual({ id: 1, name: 'Happy' });
      expect(moodService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a mood', async () => {
      const id = 1;
      const updateMoodDto = { name: 'Sad', type: 'Negative', color: 'Blue' };
      const result = await moodController.update(id.toString(), updateMoodDto);
      expect(result).toEqual({ id: 1, name: 'Sad' });
      expect(moodService.update).toHaveBeenCalledWith(id, updateMoodDto);
    });
  });

  describe('remove', () => {
    it('should remove a mood', async () => {
      const id = 1;
      const result = await moodController.remove(id.toString());
      expect(result).toBeUndefined();
      expect(moodService.remove).toHaveBeenCalledWith(id);
    });
  });
});
