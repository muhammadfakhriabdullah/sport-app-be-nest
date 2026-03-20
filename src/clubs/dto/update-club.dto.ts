import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateClubDto {
  @IsString()
  @IsOptional()
  coach_name?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEmail()
  @IsOptional()
  contact_email?: string;
}
