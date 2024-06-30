import { IsString } from 'class-validator';

export class CreateMoodDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  color: string;
}
