import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../users/user.entity';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn().mockResolvedValue({
              id: 1,
              email: 'testuser@example.com',
              name: 'Test User',
              dateOfBirth: new Date('1990-01-01'),
              firebaseUid: 'mockFirebaseUid',
              isAdmin: false,
              passwordHash: 'hashedPassword',
              createdAt: new Date(),
              reminder: false,
            }),
            deleteUser: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should sign up a user', async () => {
      const signUpDto: SignUpDto = {
        email: 'testuser@example.com',
        password: 'testpassword',
        name: 'Test User',
        dateOfBirth: new Date('1990-01-01'),
      };

      const result: User = {
        id: 1,
        email: 'testuser@example.com',
        name: 'Test User',
        dateOfBirth: new Date('1990-01-01'),
        firebaseUid: 'mockFirebaseUid',
        isAdmin: false,
        passwordHash: 'hashedPassword',
        createdAt: new Date(),
        reminder: false,
      };

      jest.spyOn(authService, 'signUp').mockResolvedValue(result);

      expect(await authController.signUp(signUpDto)).toEqual(result);
      expect(authService.signUp).toHaveBeenCalledWith(
        signUpDto.email,
        signUpDto.password,
        signUpDto.name,
        signUpDto.dateOfBirth,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const firebaseUid = 'mockFirebaseUid';
      jest.spyOn(authService, 'deleteUser').mockResolvedValue();

      expect(await authController.deleteUser(firebaseUid)).toEqual({
        message: 'User deleted successfully',
      });
      expect(authService.deleteUser).toHaveBeenCalledWith(firebaseUid);
    });
  });
});
