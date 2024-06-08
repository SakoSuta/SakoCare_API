import { IsString, IsOptional } from 'class-validator';

export class UpdateActivityDto {
  @IsOptional()
  @IsString()
  activityType?: string;
}
