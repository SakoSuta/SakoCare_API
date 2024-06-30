import { Controller, Post, Body } from '@nestjs/common';
import { UserResourcesService } from './userResources.service';
import { RecommendResourcesDto } from './dto/recommend-resources.dto';

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
}
