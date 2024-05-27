import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        './sakocare-57a29-firebase-adminsdk.json',
      ),
    });
  }
}
