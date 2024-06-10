import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  async createUser(email: string, password: string) {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    return userRecord;
  }

  async deleteUser(uid: string): Promise<void> {
    await admin.auth().deleteUser(uid);
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      return null;
    }
  }
}
