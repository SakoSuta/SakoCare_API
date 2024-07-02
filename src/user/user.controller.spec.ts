import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmotionalJournal } from '../entity/emotionalJournal.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findIdByFirebaseUid: jest.fn().mockResolvedValue(1),
            findJournalsByUserId: jest
              .fn()
              .mockResolvedValue([new EmotionalJournal()]),
            findJournalsByUserIdAndDate: jest
              .fn()
              .mockResolvedValue([new EmotionalJournal()]),
            findJournalsByUserIdAndYear: jest
              .fn()
              .mockResolvedValue([new EmotionalJournal()]),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUserIdByFirebaseUid', () => {
    it('should return user id by firebase uid', async () => {
      const uid = 'firebaseUid123';
      const result = await userController.getUserIdByFirebaseUid(uid);
      expect(result).toEqual({ id: 1 });
      expect(userService.findIdByFirebaseUid).toHaveBeenCalledWith(uid);
    });
  });

  describe('getUserJournals', () => {
    it('should return user journals', async () => {
      const userId = 1;
      const result = await userController.getUserJournals(userId);
      expect(result).toBeInstanceOf(Array);
      expect(userService.findJournalsByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('getUserJournalsByDate', () => {
    it('should return user journals by date', async () => {
      const userId = 1;
      const date = '2023-07-01';
      const result = await userController.getUserJournalsByDate(userId, date);
      expect(result).toBeInstanceOf(Array);
      expect(userService.findJournalsByUserIdAndDate).toHaveBeenCalledWith(
        userId,
        new Date(date),
      );
    });
  });

  describe('getUserJournalsByYear', () => {
    it('should return user journals by year', async () => {
      const userId = 1;
      const year = 2023;
      const result = await userController.getUserJournalsByYear(userId, year);
      expect(result).toBeInstanceOf(Array);
      expect(userService.findJournalsByUserIdAndYear).toHaveBeenCalledWith(
        userId,
        year,
      );
    });
  });
});
