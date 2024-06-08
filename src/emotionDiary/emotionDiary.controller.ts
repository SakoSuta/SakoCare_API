import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EmotionDiaryService } from './emotionDiary.service';
import { EmotionalJournal } from '../entity/emotionalJournal.entity';

import { CreateEmotionDiaryDto } from './dto/create-emotion-diary.dto';
import { UpdateEmotionDiaryDto } from './dto/update-emotion-diary.dto';

@Controller('emotion-diary')
export class EmotionDiaryController {
  constructor(private readonly emotionDiaryService: EmotionDiaryService) {}

  @Post()
  async create(@Body() createEmotionDiaryDto: CreateEmotionDiaryDto) {
    return this.emotionDiaryService.create(createEmotionDiaryDto);
  }

  @Get()
  findAll(): Promise<EmotionalJournal[]> {
    return this.emotionDiaryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.emotionDiaryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmotionDiaryDto: UpdateEmotionDiaryDto,
  ) {
    return this.emotionDiaryService.update(+id, updateEmotionDiaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.emotionDiaryService.remove(+id);
  }
}
