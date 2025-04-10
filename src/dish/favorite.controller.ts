import { Controller, Get, Param } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly dishesService: DishService) {}

  @Get(':id')
  async create(@Param('id') createFavoriteDto: CreateFavoriteDto) {
    try {
      await this.dishesService.create(createFavoriteDto);

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
