import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(createEmotionDiaryDto: CreateEmotionDiaryDto): Promise<EmotionalJournal> {
    const { user_id, mood_id, activity_id, ...journalData } = createEmotionDiaryDto;

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const mood = await this.moodRepository.findOne({ where: { id: mood_id } });
    const activity = await this.activityRepository.findOne({ where: { id: activity_id } });

    const emotionDiary = this.emotionDiaryRepository.create({
      ...journalData,
      user,
      mood,
      activity,
    });

    return this.emotionDiaryRepository.save(emotionDiary);
  }

  async findAll(): Promise<EmotionalJournal[]> {
    return this.emotionDiaryRepository.find({ relations: ['user', 'mood', 'activity'] });
  }

  async findOne(id: number): Promise<EmotionalJournal> {
    return this.emotionDiaryRepository.findOne({ where: { id }, relations: ['user', 'mood', 'activity'] });
  }

  async update(id: number, updateEmotionDiaryDto: UpdateEmotionDiaryDto): Promise<EmotionalJournal> {
    const journal = await this.findOne(id);

    if (updateEmotionDiaryDto.user_id) {
      journal.user = await this.userRepository.findOne({ where: { id: updateEmotionDiaryDto.user_id } });
    }
    if (updateEmotionDiaryDto.mood_id) {
      journal.mood = await this.moodRepository.findOne({ where: { id: updateEmotionDiaryDto.mood_id } });
    }
    if (updateEmotionDiaryDto.activity_id) {
      journal.activity = await this.activityRepository.findOne({ where: { id: updateEmotionDiaryDto.activity_id } });
    }

    Object.assign(journal, updateEmotionDiaryDto);
    return this.emotionDiaryRepository.save(journal);
  }

  async remove(id: number): Promise<void> {
    await this.emotionDiaryRepository.delete(id);
  }
}
