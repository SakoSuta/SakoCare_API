import { IsString, IsUrl } from 'class-validator';

export class CreateAdviceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsUrl()
  url?: string;

  @IsString()
  category: string;
}
