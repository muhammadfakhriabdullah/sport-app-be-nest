import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const existingUsername = await this.usersService.findByUsername(
      registerDto.username,
    );
    if (existingUsername) {
      throw new ConflictException('Username already in use');
    }

    const createdUser = await this.usersService.create({
      email: registerDto.email,
      username: registerDto.username,
      password: registerDto.password,
      role_id: registerDto.role_id,
    });

    return this.buildAuthResponse(
      createdUser.id,
      createdUser.email,
      createdUser.username,
      createdUser.role_id,
    );
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByEmailWithPassword(
      signInDto.email,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(
      user.id,
      user.email,
      user.username,
      user.role_id,
    );
  }

  private buildAuthResponse(
    id: string,
    email: string,
    username: string,
    role_id: number,
  ) {
    const payload = { sub: id, email, username, role_id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id, email, username, role_id },
    };
  }
}
