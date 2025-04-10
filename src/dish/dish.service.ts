import { HttpException, Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private dishesRepository: Repository<Dish>,
  ) {}
  async create(createDishDto: CreateDishDto): Promise<Dish> {
    const newDish = this.dishesRepository.create(createDishDto);
    return this.dishesRepository.save(newDish);
  }

  async findAll(): Promise<Dish[]> {
    return await this.dishesRepository.find();
  }

  async findOne(id: number) {
    const dish = await this.dishesRepository.findOneBy({ id });

    if (!dish) {
      throw new HttpException('Dish Not Found', 404);
    }
    return dish;
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    const existingDish = await this.findOne(id);
    const dish = this.dishesRepository.merge(existingDish, updateDishDto);
    return await this.dishesRepository.save(dish);
  }

  async remove(id: number) {
    const existingDish = await this.findOne(id);
    return this.dishesRepository.remove(existingDish);
  }
}
