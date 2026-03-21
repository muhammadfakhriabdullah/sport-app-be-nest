import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createClubDto: CreateClubDto) {
    const club = await this.clubsService.create(createClubDto);

    return {
      success: true,
      message: 'Club created successfully',
      data: club,
    };
  }

  @Get()
  async findAll() {
    const clubs = await this.clubsService.findAll();

    return {
      success: true,
      message: 'Clubs fetched successfully',
      data: clubs,
    };
  }

  @Get(':organizationId')
  async findOne(@Param('organizationId', ParseIntPipe) organizationId: number) {
    const club = await this.clubsService.findOne(organizationId);

    if (!club) {
      throw new NotFoundException({
        success: false,
        message: 'Club not found',
      });
    }

    return {
      success: true,
      message: 'Club fetched successfully',
      data: club,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':organizationId')
  async update(
    @Param('organizationId', ParseIntPipe) organizationId: number,
    @Body() updateClubDto: UpdateClubDto,
  ) {
    const club = await this.clubsService.update(organizationId, updateClubDto);

    if (!club) {
      throw new NotFoundException({
        success: false,
        message: 'Club not found',
      });
    }

    return {
      success: true,
      message: 'Club updated successfully',
      data: club,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':organizationId')
  async remove(@Param('organizationId', ParseIntPipe) organizationId: number) {
    await this.clubsService.remove(organizationId);

    return {
      success: true,
      message: 'Club deleted successfully',
    };
  }
}
