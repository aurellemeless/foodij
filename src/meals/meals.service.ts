import { HttpException, Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
  ) {}
  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const newMeal = this.mealsRepository.create(createMealDto);
    return this.mealsRepository.save(newMeal);
  }

  async findAll(): Promise<Meal[]> {
    return await this.mealsRepository.find();
  }

  async findOne(id: number) {
    const meal = await this.mealsRepository.findOneBy({ id });

    if (!meal) {
      throw new HttpException('Meal Not Found', 404);
    }
    return meal;
  }

  async update(id: number, updateMealDto: UpdateMealDto) {
    const existingMeal = await this.findOne(id);
    const meal = this.mealsRepository.merge(existingMeal, updateMealDto);
    return await this.mealsRepository.save(meal);
  }

  async remove(id: number) {
    const existingMeal = await this.findOne(id);
    return this.mealsRepository.remove(existingMeal);
  }
}
