import { IsString, IsOptional } from 'class-validator';

export class UpdateMoodDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}
