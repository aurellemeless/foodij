import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export const MailerConfig = {
  transport: `smtp://${process.env.MAILER_USER}:${process.env.MAILER_PASSWORD}@${process.env.MAILER_HOST}`,
  defaults: {
    from: `${process.env.APP_NAME} <${process.env.MAILER_NOREPLY_EMAIL}>`,
  },
  template: {
    dir: __dirname + '/../templates',
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
