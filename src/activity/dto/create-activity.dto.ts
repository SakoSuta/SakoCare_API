import { IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  activityType: string;
}
