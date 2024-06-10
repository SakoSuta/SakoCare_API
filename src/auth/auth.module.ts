import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { FirebaseService } from '../firebase/firebase.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guard/auth.guard';

import { User } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, FirebaseService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
