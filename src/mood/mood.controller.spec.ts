import { Test, TestingModule } from '@nestjs/testing';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { AuthService } from '../auth/auth.service';
import { AdminGuard } from '../guard/admin.guard';
import { AuthGuard } from '../guard/auth.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mood } from '../entity/mood.entity';
import { User } from '../entity/user.entity';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';
import {
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

describe('MoodController', () => {
  let controller: MoodController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodController],
      providers: [
        MoodService,
        AuthService,
        {
          provide: AdminGuard,
          useValue: {
            canActivate: jest.fn((context) => {
              const request = context.switchToHttp().getRequest();
              const user = request.user;
              if (!user || !user.isAdmin) {
                throw new ForbiddenException('User is not an admin');
              }
              return true;
            }),
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn((context) => {
              const request = context.switchToHttp().getRequest();
              const user = request.user;
              if (!user) {
                throw new UnauthorizedException('User not authenticated');
              }
              return true;
            }),
          },
        },
        {
          provide: getRepositoryToken(Mood),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: MoodService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'Happy', type: 'Positive' }),
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: 1, name: 'Happy', type: 'Positive' }]),
            findOne: jest.fn().mockImplementation((id: number) => {
              if (id === 1) {
                return { id: 1, name: 'Happy', type: 'Positive' };
              } else {
                throw new NotFoundException(`Mood with ID ${id} not found`);
              }
            }),
            update: jest.fn().mockImplementation((id: number) => {
              if (id === 1) {
                return { id: 1, name: 'Updated Mood', type: 'Positive' };
              } else {
                throw new NotFoundException(`Mood with ID ${id} not found`);
              }
            }),
            remove: jest.fn().mockImplementation((id: number) => {
              if (id === 1) {
                return undefined;
              } else {
                throw new NotFoundException(`Mood with ID ${id} not found`);
              }
            }),
          },
        },
        {
          provide: AuthService,
          useValue: {
            verifyToken: jest
              .fn()
              .mockResolvedValue({ id: 1, email: 'test@example.com' }),
            isAdmin: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<MoodController>(MoodController);
    authService = module.get<AuthService>(AuthService);
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

  it('should throw an error if mood is not found', async () => {
    await expect(controller.findOne('2')).rejects.toThrow(
      new NotFoundException(`Mood with ID 2 not found`),
    );
  });

  it('should update a mood', async () => {
    const updateMoodDto: UpdateMoodDto = { name: 'Updated Mood' };
    expect(await controller.update('1', updateMoodDto)).toEqual({
      id: 1,
      name: 'Updated Mood',
      type: 'Positive',
    });
  });

  it('should throw an error if updating a non-existing mood', async () => {
    const updateMoodDto: UpdateMoodDto = { name: 'Updated Mood' };
    await expect(controller.update('2', updateMoodDto)).rejects.toThrow(
      new NotFoundException(`Mood with ID 2 not found`),
    );
  });

  it('should remove a mood', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });

  it('should throw an error if removing a non-existing mood', async () => {
    await expect(controller.remove('2')).rejects.toThrow(
      new NotFoundException(`Mood with ID 2 not found`),
    );
  });

  it('should return a forbidden error for protected route', async () => {
    authService.isAdmin = jest.fn().mockResolvedValue(false); // Simuler un utilisateur non admin
    const createMoodDto: CreateMoodDto = { name: 'Test', type: 'Negative' };
    await expect(controller.create(createMoodDto)).rejects.toThrow(
      new ForbiddenException('User is not an admin'),
    );
  });

  it('should return an unauthorized error for unauthorized route', async () => {
    authService.verifyToken = jest.fn().mockResolvedValue(null); // Simuler un utilisateur non authentifié
    const createMoodDto: CreateMoodDto = { name: 'Test', type: 'Negative' };
    await expect(controller.create(createMoodDto)).rejects.toThrow(
      new UnauthorizedException('User not authenticated'),
    );
  });
});
