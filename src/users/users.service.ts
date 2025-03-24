import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register-dto';

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

  async create(registerDto: RegisterDto): Promise<User | undefined> {
    const user = this.userRepository.create(registerDto);
    return await this.userRepository.save(user);
  }
}
