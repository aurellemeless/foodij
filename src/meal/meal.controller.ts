import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { MealService } from './meal.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('meals')
@UseGuards(JwtAuthGuard)
export class MealController {
  constructor(private readonly mealsService: MealService) {}

  @Post()
  async create(@Body() createMealDto: CreateMealDto) {
    try {
      await this.mealsService.create(createMealDto);

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

  @Get()
  async findAll() {
    try {
      return await this.mealsService.findAll();
    } catch (error) {
      return {
        success: false,
        message: error.message as string,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.mealsService.findOne(+id);
    } catch (error) {
      return {
        success: false,
        message: error.message as string,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    try {
      return await this.mealsService.update(+id, updateMealDto);
    } catch (error) {
      return {
        success: false,
        message: error.message as string,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.mealsService.remove(+id);
    } catch (error) {
      return {
        success: false,
        message: error.message as string,
      };
    }
  }
}
