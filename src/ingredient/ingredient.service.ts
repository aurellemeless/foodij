import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}
  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const newIngredient = this.ingredientRepository.create(createIngredientDto);
    return await this.ingredientRepository.save(newIngredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find();
  }

  async findOne(id: number) {
    const existing = await this.ingredientRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('Ingredient not found');
    }
    return existing;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    const existing = await this.ingredientRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('Ingredient not found');
    }

    return await this.ingredientRepository.update({ id }, updateIngredientDto);
  }

  async remove(id: number) {
    const existing = await this.ingredientRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('Ingredient not found');
    }

    return await this.ingredientRepository.remove(existing);
  }
}
