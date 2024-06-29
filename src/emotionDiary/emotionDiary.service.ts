import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EmotionalJournal } from '../entity/emotionalJournal.entity';
import { User } from '../entity/user.entity';
import { Mood } from '../entity/mood.entity';
import { Activity } from '../entity/activity.entity';
import { CreateEmotionDiaryDto } from './dto/create-emotion-diary.dto';
import { UpdateEmotionDiaryDto } from './dto/update-emotion-diary.dto';

@Injectable()
export class EmotionDiaryService {
  constructor(
    @InjectRepository(EmotionalJournal)
    private readonly emotionDiaryRepository: Repository<EmotionalJournal>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Mood)
    private readonly moodRepository: Repository<Mood>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async create(
    createEmotionDiaryDto: CreateEmotionDiaryDto,
  ): Promise<EmotionalJournal> {
    const { user_id, mood_id, activity_id, entry_date, ...journalData } =
      createEmotionDiaryDto;

    const utcEntryDate = new Date(entry_date);
    utcEntryDate.setUTCHours(0, 0, 0, 0);

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const mood = await this.moodRepository.findOne({ where: { id: mood_id } });
    const activities = await this.activityRepository.find({
      where: { id: In(activity_id) },
    });

    const activityId = activities.map((activity) => activity.id);

    const emotionDiary = this.emotionDiaryRepository.create({
      ...journalData,
      entry_date: utcEntryDate,
      user,
      mood,
      activities: activityId,
    });

    return this.emotionDiaryRepository.save(emotionDiary);
  }

  async findAll(): Promise<EmotionalJournal[]> {
    const journals = await this.emotionDiaryRepository.find({
      relations: ['user', 'mood'],
    });

    for (const journal of journals) {
      journal['activityDetails'] = await this.activityRepository.find({
        where: { id: In(journal.activities) },
      });
    }

    return journals;
  }

  async findOne(id: number): Promise<EmotionalJournal> {
    const journal = await this.emotionDiaryRepository.findOne({
      where: { id },
      relations: ['user', 'mood'],
    });

    if (journal) {
      journal['activityDetails'] = await this.activityRepository.find({
        where: { id: In(journal.activities) },
      });
    }

    return journal;
  }

  async update(
    id: number,
    updateEmotionDiaryDto: UpdateEmotionDiaryDto,
  ): Promise<EmotionalJournal> {
    const journal = await this.findOne(id);

    if (updateEmotionDiaryDto.user_id) {
      journal.user = await this.userRepository.findOne({
        where: { id: updateEmotionDiaryDto.user_id },
      });
    }
    if (updateEmotionDiaryDto.mood_id) {
      journal.mood = await this.moodRepository.findOne({
        where: { id: updateEmotionDiaryDto.mood_id },
      });
    }
    if (updateEmotionDiaryDto.activity_id) {
      const activities = await this.activityRepository.find({
        where: { id: In(updateEmotionDiaryDto.activity_id) },
      });
      journal.activities = activities.map((activity) => activity.id);
    }

    Object.assign(journal, updateEmotionDiaryDto);
    return this.emotionDiaryRepository.save(journal);
  }

  async remove(id: number): Promise<void> {
    await this.emotionDiaryRepository.delete(id);
  }
}
