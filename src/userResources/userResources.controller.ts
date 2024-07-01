import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UserResourcesService } from './userResources.service';
import { RecommendResourcesDto } from './dto/recommend-resources.dto';
import { UpdateUserResourceDto } from './dto/update-user-resource.dto';
import { UserResources } from '../entity/userResources.entity';

@Controller('user-resources')
export class UserResourcesController {
  constructor(private readonly userResourcesService: UserResourcesService) {}

  @Post('recommend')
  async recommendResources(
    @Body() recommendResourcesDto: RecommendResourcesDto,
  ) {
    const { userId, startDate, endDate } = recommendResourcesDto;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.userResourcesService.recommendResources(userId, start, end);
  }

  @Get()
  async findAll() {
    return this.userResourcesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserResources> {
    return this.userResourcesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserResourceDto: UpdateUserResourceDto,
  ) {
    return this.userResourcesService.update(id, updateUserResourceDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userResourcesService.remove(id);
  }
}
