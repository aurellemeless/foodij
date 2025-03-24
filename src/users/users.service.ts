import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const exsitingUser = await this.userRepository.findOneBy({ username });
    if (!exsitingUser) {
      throw new NotFoundException();
    }
    return exsitingUser;
  }
}
