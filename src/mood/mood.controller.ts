import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MoodService } from './mood.service';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';
import { Mood } from '../entity/mood.entity';
import { AuthGuard } from '../guard/auth.guard';
import { AdminGuard } from '../guard/admin.guard';

@Controller('moods')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMoodDto: CreateMoodDto): Promise<Mood> {
    return this.moodService.create(createMoodDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Mood[]> {
    return this.moodService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Mood> {
    return this.moodService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateMoodDto: UpdateMoodDto,
  ): Promise<Mood> {
    return this.moodService.update(+id, updateMoodDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.moodService.remove(+id);
  }
}
