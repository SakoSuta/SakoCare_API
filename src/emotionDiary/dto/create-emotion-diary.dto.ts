import {
  IsDate,
  IsInt,
  IsArray,
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmotionDiaryDto {
  @IsInt()
  user_id: number;

  @IsDate()
  @Type(() => Date)
  entry_date: Date;

  @IsInt()
  mood_id: number;

  @IsInt()
  @Min(1)
  @Max(5)
  energy_level?: number;

  @IsInt()
  @Min(1)
  @Max(5)
  stress_level?: number;

  @IsInt()
  @Min(1)
  @Max(5)
  social_level?: number;

  @IsArray()
  @IsInt({ each: true })
  activity_id?: number[];

  @IsNumber()
  @Max(24)
  sleep_hours?: number;

  @IsInt()
  @Max(24)
  exercise_time?: number;

  @IsString()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_favorite?: boolean;
}
