import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async signUp(email: string, password: string) {
    return this.firebaseService.createUser(email, password);
  }
}
