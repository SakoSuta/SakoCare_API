import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FirebaseService } from '../firebase/firebase.service';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(
    email: string,
    password: string,
    name: string,
    dateOfBirth: Date,
  ) {
    const firebaseUser = await this.firebaseService.createUser(email, password);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User();
    user.email = email;
    user.name = name;
    user.passwordHash = passwordHash;
    user.dateOfBirth = dateOfBirth;
    user.firebaseUid = firebaseUser.uid;

    return this.userRepository.save(user);
  }

  async deleteUser(firebaseUid: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { firebaseUid } });
    if (!user) {
      throw new NotFoundException(`User with UID ${firebaseUid} not found`);
    }
    await this.firebaseService.deleteUser(firebaseUid);
    await this.userRepository.delete({ firebaseUid });
  }
}
