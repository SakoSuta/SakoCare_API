import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EmotionalJournal } from '../entity/emotionalJournal.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':uid')
  async getUserIdByFirebaseUid(
    @Param('uid') uid: string,
  ): Promise<{ id: number }> {
    const userId = await this.userService.findIdByFirebaseUid(uid);
    return { id: userId };
  }

  @Get('emotion-diary/:id')
  async getUserJournals(@Param('id') id: number): Promise<EmotionalJournal[]> {
    const journals = await this.userService.findJournalsByUserId(id);
    if (!journals.length) {
      throw new NotFoundException('No journals found for this user');
    }
    return journals;
  }

  @Get('emotion-diary/:id/by-date')
  async getUserJournalsByDate(
    @Param('id') id: number,
    @Query('date') date: string,
  ): Promise<EmotionalJournal[]> {
    const journals = await this.userService.findJournalsByUserIdAndDate(
      id,
      new Date(date),
    );
    if (!journals.length) {
      throw new NotFoundException(
        'No journals found for this user on the specified date',
      );
    }
    return journals;
  }
}
