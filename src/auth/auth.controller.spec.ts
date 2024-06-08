import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn().mockResolvedValue({
              id: 1,
              email: 'test@example.com',
              name: 'Test User',
              dateOfBirth: new Date('2000-01-01'),
              firebaseUid: 'firebase-uid',
            }),
            deleteUser: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign up a user', async () => {
    const signUpDto: SignUpDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      dateOfBirth: new Date('2000-01-01'),
    };

    expect(await controller.signUp(signUpDto)).toEqual({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      dateOfBirth: new Date('2000-01-01'),
      firebaseUid: 'firebase-uid',
    });
  });

  it('should delete a user', async () => {
    expect(await controller.deleteUser('firebase-uid')).toEqual({
      message: 'User deleted successfully',
    });
  });
});
