import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClubDto {
  @IsInt()
  organization_id: number;

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
