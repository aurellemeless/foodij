import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientModule } from './ingredient/ingredient.module';
import { PlanningModule } from './planning/planning.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DbConfig } from './config/db.config';
import { BullModule } from '@nestjs/bullmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from './config/mailer.config';
import { DishModule } from './dish/dish.module';

@Module({
  imports: [
    MailerModule.forRoot(MailerConfig),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DbConfig),
    IngredientModule,
    PlanningModule,
    TaskModule,
    AuthModule,
    UsersModule,
    DishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
