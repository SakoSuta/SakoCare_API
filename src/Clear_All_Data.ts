import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { AuthService } from './auth/auth.service';

async function clearDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const authService = app.get(AuthService);

  try {
    await dataSource.query(
      'TRUNCATE TABLE "emotional_journal" RESTART IDENTITY CASCADE',
    );
    console.log('Emotional journals deleted');

    await dataSource.query(
      'TRUNCATE TABLE "user_resources" RESTART IDENTITY CASCADE',
    );
    console.log('User resources deleted');

    await dataSource.query(
      'TRUNCATE TABLE "resources" RESTART IDENTITY CASCADE',
    );
    console.log('Resources deleted');

    await dataSource.query('TRUNCATE TABLE "moods" RESTART IDENTITY CASCADE');
    console.log('Moods deleted');

    await dataSource.query(
      'TRUNCATE TABLE "activity" RESTART IDENTITY CASCADE',
    );
    console.log('Activities deleted');

    const users = await authService.findAllUsers();
    for (const user of users) {
      await authService.deleteUser(user.firebaseUid);
    }
    console.log('Firebase users deleted');

    await dataSource.query('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE');
    console.log('Users deleted');
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    await app.close();
  }
}

clearDatabase();
