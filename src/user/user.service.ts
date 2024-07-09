import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';

import { User } from '../entity/user.entity';

import { EmotionalJournal } from '../entity/emotionalJournal.entity';
import { Activity } from '../entity/activity.entity';
import { UserResources } from '../entity/userResources.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(EmotionalJournal)
    private readonly journalRepository: Repository<EmotionalJournal>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(UserResources)
    private readonly userResourcesRepository: Repository<UserResources>,
  ) {}

  async findIdByFirebaseUid(firebaseUid: string): Promise<number> {
    const user = await this.userRepository.findOne({ where: { firebaseUid } });
    return user ? user.id : null;
  }

  async findJournalsByUserId(userId: number): Promise<EmotionalJournal[]> {
    return this.journalRepository.find({
      where: { user: { id: userId } },
      relations: ['mood'],
    });
  }

  async findJournalsByUserIdAndDate(
    userId: number,
    date: Date,
  ): Promise<EmotionalJournal[]> {
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);
    const journals = await this.journalRepository.find({
      where: {
        user: { id: userId },
        entry_date: Between(startDate, endDate),
      },
      relations: ['mood'],
    });

    for (const journal of journals) {
      if (journal.activities && journal.activities.length > 0) {
        journal['activityDetails'] = await this.activityRepository.find({
          where: { id: In(journal.activities) },
        });
      } else {
        journal['activityDetails'] = [];
      }
    }
    return journals;
  }

  async findJournalsByUserIdAndWeek(
    userId: number,
    startDate: Date,
  ): Promise<EmotionalJournal[]> {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setUTCHours(23, 59, 59, 999);

    const journals = await this.journalRepository.find({
      where: {
        user: { id: userId },
        entry_date: Between(startDate, endDate),
      },
      relations: ['mood'],
    });

    for (const journal of journals) {
      if (journal.activities && journal.activities.length > 0) {
        journal['activityDetails'] = await this.activityRepository.find({
          where: { id: In(journal.activities) },
        });
      } else {
        journal['activityDetails'] = [];
      }
    }
    return journals;
  }

  async findJournalsByUserIdAndYear(
    userId: number,
    year: number,
  ): Promise<EmotionalJournal[]> {
    const startDate = new Date(Date.UTC(year, 0, 1));
    const endDate = new Date(Date.UTC(+year + 1, 0, 1));

    return this.journalRepository.find({
      where: {
        user: { id: userId },
        entry_date: Between(startDate, endDate),
      },
      relations: ['mood'],
    });
  }

  async findJournalsByUserIdAndMonth(
    userId: number,
    month: Date,
  ): Promise<EmotionalJournal[]> {
    const startDate = new Date(
      Date.UTC(month.getFullYear(), month.getMonth(), 1),
    );
    const endDate = new Date(
      Date.UTC(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999),
    );

    const journals = await this.journalRepository.find({
      where: {
        user: { id: userId },
        entry_date: Between(startDate, endDate),
      },
      relations: ['mood'],
    });

    for (const journal of journals) {
      if (journal.activities && journal.activities.length > 0) {
        journal['activityDetails'] = await this.activityRepository.find({
          where: { id: In(journal.activities) },
        });
      } else {
        journal['activityDetails'] = [];
      }
    }
    return journals;
  }

  async findUserResourcesByUserId(userId: number): Promise<UserResources[]> {
    return this.userResourcesRepository.find({
      where: { user: { id: userId } },
      relations: ['resource'],
    });
  }
}
