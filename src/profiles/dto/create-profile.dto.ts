import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GenderEnum } from '../profiles.entity';
import { Type } from 'class-transformer';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @Type(() => Date)
  @IsDate()
  birth_date: Date;

  @IsString()
  birth_place: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  gender: GenderEnum;

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
