import { Post, Body, Query, Controller, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register-dto';
import { PasswordResetDto } from './dto/password-reset-dto';
import { RequestPasswordResetDto } from './dto/request-password-reset-dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return await this.usersService.register(registerDto);
  }

  @Post('activate')
  @HttpCode(200)
  async activateAccount(@Query('token') token: string): Promise<any> {
    await this.usersService.activateAccount(token);
  }

  @Post('password-reset/request')
  @HttpCode(200)
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ): Promise<{ message: string }> {
    const { email } = requestPasswordResetDto;
    await this.usersService.generatePasswordResetToken(email);
    return { message: 'Password reset token sent' };
  }

  @Post('password-reset')
  @HttpCode(200)
  async resetPassword(
    @Body() passwordResetDto: PasswordResetDto,
  ): Promise<{ message: string }> {
    const { token, newPassword } = passwordResetDto;
    await this.usersService.resetPassword(token, newPassword);
    return { message: 'Password reset successful' };
  }
}
