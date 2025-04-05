import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/users/dto/register-dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectQueue('user')
    private userQueue: Queue,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const exsitingUser = await this.userRepository.findOneBy({ email });
    if (!exsitingUser) {
      throw new NotFoundException();
    }
    return exsitingUser;
  }

  async register(registerDto: RegisterDto): Promise<Partial<User>> {
    const { email, password: pass } = registerDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }
    // Hash the password
    const hashedPassword = await this.hashPassword(pass); // Hash the password

    // Create and save the user
    const newUser = this.userRepository.create({
      username: email,
      email,
      password: hashedPassword,
    });

    const savedUser: Partial<User> = await this.userRepository.save(newUser);

    // Generate activation token
    const token = this.generateActivationToken(savedUser.id as number);
    savedUser.activationToken = token;
    await this.userRepository.save(savedUser);
    await this.userQueue.add('register', savedUser);
    delete savedUser.activationToken;
    delete savedUser.password;

    return savedUser;
  }

  private generateActivationToken(userId: number): string {
    // Encode the user ID in hexadecimal
    return crypto.createHash('sha256').update(userId.toString()).digest('hex');
  }

  async activateAccount(token: string): Promise<any> {
    // Decode the token to find the user
    const user = await this.userRepository.findOneBy({
      activationToken: token,
    });

    if (!user) {
      throw new NotFoundException('Invalid activation token');
    }

    if (user.isActive) {
      throw new BadRequestException('Account is already activated');
    }
    user.activationToken = null;
    user.isActive = true;
    await this.userRepository.save(user);
    await this.userQueue.add('activate', user);
    return { message: 'Account activated' };
  }

  async generatePasswordResetToken(email: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const token = this.createToken();
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await this.userRepository.save(user);
    await this.userQueue.add('password-reset-request', user);
    return token;
  }

  private createToken(): string {
    return crypto.randomBytes(32).toString('hex'); // Generate a random token
  }

  async resetPassword(token: string, newPassword: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      resetToken: token,
    });
    if (
      !user ||
      (user.resetTokenExpiry && user.resetTokenExpiry < Date.now())
    ) {
      throw new BadRequestException('Invalid or expired token');
    }
    user.password = await this.hashPassword(newPassword); // Implement password hashing
    user.resetTokenExpiry = 0;
    await this.userRepository.update(
      { id: user.id },
      {
        password: user.password,
      },
    );

    await this.userQueue.add('password-reset', user);
    return { message: 'Password reset successfully' };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Define the number of salt rounds
    return bcrypt.hash(password, saltRounds); // Hash the password using bcrypt
  }
}
