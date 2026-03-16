import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GenderEnum } from './profiles.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    // Map gender string to GenderEnum
    const mappedProfile = {
      ...createProfileDto,
      gender:
        createProfileDto.gender === GenderEnum.MALE
          ? GenderEnum.MALE
          : createProfileDto.gender === GenderEnum.FEMALE
            ? GenderEnum.FEMALE
            : undefined,
    };
    const profile = await this.profilesService.create(mappedProfile);
    return {
      success: true,
      message: 'Profile created successfully',
      data: profile,
    };
  }

  @Get()
  async findAll() {
    const profiles = await this.profilesService.findAll();
    return {
      success: true,
      message: 'Profiles fetched successfully',
      data: profiles,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const mappedProfile = {
      ...updateProfileDto,
      gender:
        updateProfileDto.gender === undefined
          ? undefined
          : updateProfileDto.gender === GenderEnum.MALE
            ? GenderEnum.MALE
            : updateProfileDto.gender === GenderEnum.FEMALE
              ? GenderEnum.FEMALE
              : undefined,
    };

    const profile = await this.profilesService.update(id, mappedProfile);

    return {
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    };
  }
}
