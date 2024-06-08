import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MoodService } from './mood.service';
import { Mood } from '../entity/mood.entity';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';

@Controller('moods')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Post()
  async create(@Body() createMoodDto: CreateMoodDto): Promise<Mood> {
    return this.moodService.create(createMoodDto);
  }

  @Get()
  findAll(): Promise<Mood[]> {
    return this.moodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Mood> {
    return this.moodService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMoodDto: UpdateMoodDto,
  ): Promise<Mood> {
    return this.moodService.update(+id, updateMoodDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.moodService.remove(+id);
  }
}
