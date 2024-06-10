import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      const mood = this.moodRepository.create(createMoodDto);
      return this.moodRepository.save(mood);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create mood');
    }
  }

  async findAll(): Promise<Mood[]> {
    try {
      return this.moodRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve moods');
    }
  }

  async findOne(id: number): Promise<Mood> {
    try {
      const mood = await this.moodRepository.findOne({ where: { id } });
      if (!mood) {
        throw new NotFoundException(`Mood with ID ${id} not found`);
      }
      return mood;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve mood');
    }
  }

  async update(id: number, updateMoodDto: UpdateMoodDto): Promise<Mood> {
    try {
      const mood = await this.findOne(id);
      if (!mood) {
        throw new NotFoundException(`Mood with ID ${id} not found`);
      }
      Object.assign(mood, updateMoodDto);
      return this.moodRepository.save(mood);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update mood');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const mood = await this.findOne(id);
      if (!mood) {
        throw new NotFoundException(`Mood with ID ${id} not found`);
      }
      await this.moodRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete mood');
    }
  }
}
