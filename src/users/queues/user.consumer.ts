import { MailerService } from '@nestjs-modules/mailer';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { User } from '../entities/user.entity';

@Injectable()
@Processor('user')
export class UserConsumer extends WorkerHost {
  private readonly logger = new Logger('UserConsumer', { timestamp: true });
  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'register': {
        try {
          const { email, username, activationToken } = job.data as User;
          const activationLink =
            process.env.APP_ACCOUNT_ACTIVATION_URL?.replace(
              '#TOKEN',
              activationToken as string,
            );
          await this.mailerService.sendMail({
            to: email, // list of receivers
            from: `${process.env.APP_NAME} <${process.env.MAILER_NOREPLY_EMAIL}>`, // sender address
            subject: 'Activation de votre compte Foodij', // Subject line
            template: 'register', // activation email template,
            context: { username, activationLink }, // activation token to the template
          });
          this.logger.log(`Activation email sent to: ${email}`);
        } catch (error) {
          this.logger.error(error);
        }
        break;
      }
      case 'activate': {
        try {
          const { email } = job.data as User;
          await this.mailerService.sendMail({
            to: email,
            from: `${process.env.APP_NAME} <${process.env.MAILER_NOREPLY_EMAIL}>`,
            subject: 'Bienvenue Foodij',
            template: 'activate', // welcome email template
          });
          this.logger.log(`Welcome email sent to: ${email}`);
        } catch (error) {
          this.logger.error(error);
        }
        break;
      }
      case 'password-reset-request': {
        try {
          const { email, resetToken } = job.data as {
            email: string;
            resetToken: string;
          };
          const resetLink = process.env.APP_PASSWORD_RESET_URL?.replace(
            '#TOKEN',
            resetToken,
          );
          await this.mailerService.sendMail({
            to: email,
            from: `${process.env.APP_NAME} <${process.env.MAILER_NOREPLY_EMAIL}>`,
            subject: 'Password Reset Request',
            template: 'password-reset-request', // pug template
            context: { resetLink }, // password reset token to the template
          });
          this.logger.log(`Password reset request email sent to: ${email}`);
        } catch (error) {
          this.logger.error(error);
        }
        break;
      }
      case 'password-reset': {
        try {
          const { email, username } = job.data as Partial<User>;
          await this.mailerService.sendMail({
            to: email,
            from: `${process.env.APP_NAME} <${process.env.MAILER_NOREPLY_EMAIL}>`,
            subject: 'Password Reset successful',
            template: 'password-reset', // password reset succeed email template
            context: { username },
          });
          this.logger.log(`Password reset email sent to: ${email}`);
        } catch (error) {
          this.logger.error(error);
        }
        break;
      }
    }
  }
}
