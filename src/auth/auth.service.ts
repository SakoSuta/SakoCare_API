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

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async verifyToken(token: string): Promise<User> {
    const firebaseUser = await this.firebaseService.verifyToken(token);
    if (!firebaseUser) {
      return null;
    }
    const user = await this.userRepository.findOne({
      where: { firebaseUid: firebaseUser.uid },
    });
    return user;
  }

  async isAdmin(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.isAdmin;
  }
}
