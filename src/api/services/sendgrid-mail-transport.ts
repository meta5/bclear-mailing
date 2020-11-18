import { Email } from '../models/email';
import { MailTransport } from '../services/mail-transport';
import { Sendgrid } from '../../config/sendgrid';
import { Inject } from '@nestjs/common';
import sendgrid from '@sendgrid/mail';
import { LoggerFactory, AppLogger } from '@meta5/nestjs-shared';

export class SendgridMailTransport implements MailTransport {
  private readonly logger: AppLogger;

  constructor(
    @Inject(Sendgrid) private readonly sendgridConfig: Sendgrid,
    @Inject(LoggerFactory) loggerFactory: LoggerFactory
  ) {
    sendgrid.setApiKey(this.sendgridConfig.apiKey);
    this.logger = loggerFactory.getLogger('sendgrid-mail-transport');
  }

  public async sendMail(email: Email): Promise<void> {
    const { content, isHtml, ...mail } = email;

    try {
      await sendgrid.sendMultiple({
        ...mail,
        ...(isHtml ? { html: content } : { text: content })
      });
    } catch (e) {
      this.logger.error(`Unable to send mail ${email.subject} to: ${email.to}`);
    }
  }
}
