import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResources } from '../entity/userResources.entity';
import { User } from '../entity/user.entity';
import { Resource } from '../entity/resource.entity';
import { EmotionalJournal } from '../entity/emotionalJournal.entity';
import { UserResourcesService } from './userResources.service';
import { UserResourcesController } from './userResources.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserResources, User, Resource, EmotionalJournal]),
  ],
  providers: [UserResourcesService],
  controllers: [UserResourcesController],
})
export class UserResourcesModule {}
