// import { Controller, Post, Param, Body } from '@nestjs/common';
// import { UserResourcesService } from './userResources.service';

// @Controller('user-resources')
// export class UserResourcesController {
//   constructor(private readonly userResourcesService: UserResourcesService) {}

//   @Post(':userId')
//   async suggestResourcesForUser(
//     @Param('userId') userId: number,
//     @Body('startDate') startDate: string,
//     @Body('endDate') endDate: string,
//   ) {
//     const start = new Date(startDate);
//     return this.userResourcesService.suggestResourcesForUser(userId, start);
//   }
// }
