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
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { DishService } from './dish.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('dishes')
@UseGuards(JwtAuthGuard)
export class DishController {
  constructor(private readonly dishesService: DishService) {}

  @Post()
  async create(@Body() createDishDto: CreateDishDto) {
    try {
      await this.dishesService.create(createDishDto);

      return {
        success: true,
        message: 'Dish Created Successfully',
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
      return await this.dishesService.findAll();
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
      return await this.dishesService.findOne(+id);
    } catch (error) {
      return {
        success: false,
        message: error.message as string,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    try {
      return await this.dishesService.update(+id, updateDishDto);
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
      return await this.dishesService.remove(+id);
    } catch (error) {
      return {
        success: false,
        message: error.message as string,
      };
    }
  }
}
