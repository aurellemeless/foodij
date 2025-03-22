import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const record = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(record);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const record = await this.taskRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('Task not found');
    }
    return record;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const existingTask = await this.taskRepository.findOneBy({ id });
    if (!existingTask) {
      throw new NotFoundException('Planning not found');
    }
    return await this.taskRepository.update({ id }, updateTaskDto);
  }

  async remove(id: number) {
    const existingTask = await this.taskRepository.findOneBy({ id });
    if (!existingTask) {
      throw new NotFoundException('Planning not found');
    }

    return await this.taskRepository.remove(existingTask);
  }
}
