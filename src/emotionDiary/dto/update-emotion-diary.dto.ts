import {
  IsDate,
  IsInt,
  IsString,
  IsBoolean,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateEmotionDiaryDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsDate()
  entry_date?: Date;

  @IsOptional()
  @IsInt()
  mood_id?: number;

  @IsOptional()
  @IsInt()
  energy_level?: number;

  @IsOptional()
  @IsInt()
  stress_level?: number;

  @IsOptional()
  @IsInt()
  social_level?: number;

  @IsOptional()
  @IsInt()
  activity_id?: number;

  @IsOptional()
  @IsNumber()
  sleep_hours?: number;

  @IsOptional()
  @IsInt()
  exercise_time?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_favorite?: boolean;

  @IsOptional()
  @IsArray()
  tags?: string[];
}
