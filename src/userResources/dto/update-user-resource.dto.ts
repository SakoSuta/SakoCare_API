import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateUserResourceDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  resourceId?: number;

  @IsOptional()
  @IsString()
  category?: string;
}
