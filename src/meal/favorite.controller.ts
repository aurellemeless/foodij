import { Controller, Get, Param } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly mealsService: MealService) {}

  @Get(':id')
  async create(@Param('id') createFavoriteDto: CreateFavoriteDto) {
    try {
      await this.mealsService.create(createFavoriteDto);

      return {
        success: true,
        message: 'Meal Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message as string,
      };
    }
  }
}
