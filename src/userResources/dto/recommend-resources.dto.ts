import { IsDateString, IsNotEmpty } from 'class-validator';

export class RecommendResourcesDto {
  @IsNotEmpty()
  userId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
