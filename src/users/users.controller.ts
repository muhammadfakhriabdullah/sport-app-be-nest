// users/users.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const requiredFields: Array<keyof CreateUserDto> = [
      'email',
      'password',
      'username',
      'role_id',
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = createUserDto[field];
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      throw new BadRequestException({
        success: false,
        message: 'One or more required fields are missing',
        missingFields,
      });
    }

    const user = await this.usersService.create(createUserDto);

    return {
      success: true,
      message: 'User created successfully',
      data: user,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new BadRequestException({
        success: false,
        message: 'User not found',
      });
    }

    return {
      success: true,
      message: 'User fetched successfully',
      data: user,
    };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return {
      success: true,
      message: 'Users fetched successfully',
      data: users,
    };
  }
}
