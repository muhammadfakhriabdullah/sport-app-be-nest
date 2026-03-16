import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from './profiles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(data: Partial<Profile>): Promise<Profile> {
    return this.profileRepository.save(data);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async findOne(id: number): Promise<Profile | null> {
    return this.profileRepository.findOneBy({ id: BigInt(id) });
  }

  async update(id: number, data: Partial<Profile>): Promise<Profile | null> {
    await this.profileRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.profileRepository.softDelete(id);

    if (!result.affected) {
      throw new NotFoundException('Profile not found');
    }
  }
}
