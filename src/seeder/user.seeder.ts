import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserSeeder {
  constructor(private readonly authService: AuthService) {}

  async seed() {
    const users = [
      {
        name: 'Emilie',
        email: 'SakoSuta.em@gmail.com',
        password: 'EmilieMontpre',
        dateOfBirth: new Date('2003-03-21'),
      },
    ];

    for (const user of users) {
      await this.authService.signUp(
        user.email,
        user.password,
        user.name,
        user.dateOfBirth,
      );
    }
  }
}
