import { IsString, IsUrl, IsOptional } from 'class-validator';

export class UpdateAdviceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
