import { Module } from '@nestjs/common';
import { Dish } from './entities/dish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
