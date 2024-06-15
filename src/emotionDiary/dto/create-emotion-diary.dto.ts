import {
  IsDate,
  IsInt,
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateEmotionDiaryDto {
  @IsInt()
  user_id: number;

  @IsDate()
  entry_date: Date;

  @IsInt()
  mood_id: number;

  @IsInt()
  energy_level: number;

  @IsInt()
  stress_level: number;

  @IsInt()
  social_level: number;

  @IsInt()
  activity_id: number;

  @IsNumber()
  sleep_hours: number;

  @IsInt()
  exercise_time: number;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_favorite?: boolean;
}
