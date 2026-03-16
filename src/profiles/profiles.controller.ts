import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    const profile = await this.profilesService.create(createProfileDto);
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
    const profile = await this.profilesService.update(id, updateProfileDto);

    if (!profile) {
      throw new NotFoundException({
        success: false,
        message: 'Profile not found',
      });
    }

    return {
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    }
  }
  
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.profilesService.remove(id);

    return {
      success: true,
      message: 'Profile deleted successfully',
    };
  }
}
