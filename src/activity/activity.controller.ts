import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from '../entity/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  findAll(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Activity> {
    return this.activityService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.activityService.remove(+id);
  }
}
