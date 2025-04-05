import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserConsumer } from './queues/user.consumer';
import { BullModule } from '@nestjs/bullmq';
import { Meal } from 'src/meal/entities/meal.entity';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Meal]),
    BullModule.registerQueue({
      name: 'user',
    }),
  ],
  providers: [UsersService, UserConsumer],
  exports: [UsersService],
  controllers: [AccountsController],
})
export class UsersModule {}
