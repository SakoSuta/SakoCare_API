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
  @Min(1)
  @Max(5)
  energy_level?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  stress_level?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  social_level?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  activity_id?: number[];

  @IsOptional()
  @IsNumber()
  @Max(24)
  sleep_hours?: number;

  @IsOptional()
  @IsInt()
  @Max(24)
  exercise_time?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_favorite?: boolean;
}
