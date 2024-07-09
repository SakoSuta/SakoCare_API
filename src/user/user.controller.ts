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

  @Get('emotion-diary/:userId/by-date')
  async getUserJournalsByDate(
    @Param('userId') userId: number,
    @Query('date') date: string,
  ): Promise<EmotionalJournal[]> {
    const journals = await this.userService.findJournalsByUserIdAndDate(
      userId,
      new Date(date),
    );
    if (!journals.length) {
      throw new NotFoundException(
        'No journals found for this user on the specified date',
      );
    }
    return journals;
  }

  @Get('emotion-diary/:userId/week/:startDate')
  async getUserJournalsByWeek(
    @Param('userId') userId: number,
    @Param('startDate') startDate: string,
  ): Promise<EmotionalJournal[]> {
    const journals = await this.userService.findJournalsByUserIdAndWeek(
      userId,
      new Date(startDate),
    );
    if (!journals.length) {
      throw new NotFoundException(
        'No journals found for this user in the specified week',
      );
    }
    return journals;
  }

  @Get('emotion-diary/:userId/year/:year')
  async getUserJournalsByYear(
    @Param('userId') userId: number,
    @Param('year') year: number,
  ): Promise<EmotionalJournal[]> {
    const journals = await this.userService.findJournalsByUserIdAndYear(
      userId,
      year,
    );
    if (!journals.length) {
      throw new NotFoundException(
        'No journals found for this user in the specified year',
      );
    }
    return journals;
  }

  @Get('emotion-diary/:userId/month/:month')
  async getUserJournalsByMonth(
    @Param('userId') userId: number,
    @Param('month') month: string,
  ): Promise<EmotionalJournal[]> {
    const journals = await this.userService.findJournalsByUserIdAndMonth(
      userId,
      new Date(month),
    );
    if (!journals.length) {
      throw new NotFoundException(
        'No journals found for this user in the specified month',
      );
    }
    return journals;
  }
}
