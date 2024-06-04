import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const { email, password, name, dateOfBirth } = signUpDto;
    return this.authService.signUp(email, password, name, dateOfBirth);
  }

  @Delete('delete/:firebaseUid')
  async deleteUser(@Param('firebaseUid') firebaseUid: string) {
    await this.authService.deleteUser(firebaseUid);
    return { message: 'User deleted successfully' };
  }
}
