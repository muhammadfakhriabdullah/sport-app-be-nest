import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { GenderEnum } from '../profiles.entity';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birth_date?: Date;

  @IsString()
  @IsOptional()
  birth_place?: string;

  @IsString()
  @IsOptional()
  gender?: GenderEnum;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  grade_id?: number;
}
