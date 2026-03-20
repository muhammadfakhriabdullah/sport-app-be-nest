import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './clubs.entity';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  async create(data: Partial<Club>): Promise<Club> {
    const club = this.clubRepository.create(data);
    return this.clubRepository.save(club);
  }

  async findAll(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  async findOne(organizationId: number): Promise<Club | null> {
    return this.clubRepository.findOneBy({ organization_id: organizationId });
  }

  async update(
    organizationId: number,
    data: Partial<Club>,
  ): Promise<Club | null> {
    await this.clubRepository.update({ organization_id: organizationId }, data);
    return this.findOne(organizationId);
  }

  async remove(organizationId: number): Promise<void> {
    const result = await this.clubRepository.softDelete({
      organization_id: organizationId,
    });

    if (!result.affected) {
      throw new NotFoundException('Club not found');
    }
  }
}
