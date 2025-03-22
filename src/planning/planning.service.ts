import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Planning } from './entities/planning.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(Planning)
    private planningRepository: Repository<Planning>,
  ) {}
  async create(createPlanningDto: CreatePlanningDto): Promise<Planning> {
    const record = this.planningRepository.create(createPlanningDto);
    return await this.planningRepository.save(record);
  }

  async findAll() {
    return await this.planningRepository.find();
  }

  async findOne(id: number) {
    const existing = await this.planningRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('Planning not found');
    }
    return existing;
  }

  async update(id: number, updatePlanningDto: UpdatePlanningDto) {
    const existing = await this.planningRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('Planning not found');
    }
    return await this.planningRepository.update({ id }, updatePlanningDto);
  }

  async remove(id: number) {
    const existing = await this.planningRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('Planning not found');
    }

    return await this.planningRepository.remove(existing);
  }
}
