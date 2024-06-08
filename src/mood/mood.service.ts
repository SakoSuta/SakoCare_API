import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mood } from '../entity/mood.entity';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(Mood)
    private readonly moodRepository: Repository<Mood>,
  ) {}

  async create(createMoodDto: CreateMoodDto): Promise<Mood> {
    const mood = this.moodRepository.create(createMoodDto);
    return this.moodRepository.save(mood);
  }

  async findAll(): Promise<Mood[]> {
    return this.moodRepository.find();
  }

  async findOne(id: number): Promise<Mood> {
    return this.moodRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMoodDto: UpdateMoodDto): Promise<Mood> {
    await this.moodRepository.update(id, updateMoodDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.moodRepository.delete(id);
  }
}
