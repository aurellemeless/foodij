import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealModule } from './meal/meal.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { PlanningModule } from './planning/planning.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    MealModule,
    IngredientModule,
    PlanningModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
