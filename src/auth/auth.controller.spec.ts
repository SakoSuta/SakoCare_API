import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
            signUp: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should sign up a user', async () => {
      const result = { email: 'testuser@example.com' };
      jest.spyOn(authService, 'signUp').mockImplementation(async () => result);

      expect(
        await authController.signUp({
          email: 'testuser@example.com',
          password: 'testpassword',
        }),
      ).toEqual(result);
    });
  });
});
