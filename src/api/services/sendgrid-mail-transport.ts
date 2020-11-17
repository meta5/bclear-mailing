import { Email } from '../models/email';
import { MailTransport } from '../services/mail-transport';
import { Sendgrid } from '../../config/sendgrid';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import sendgrid from '@sendgrid/mail';

export class SendgridMailTransport implements MailTransport {
  constructor(@Inject(Sendgrid) private readonly sendgridConfig: Sendgrid) {
    sendgrid.setApiKey(this.sendgridConfig.apiKey);
  }

  public async sendMail(email: Email): Promise<void> {
    const { content, isHtml, ...mail } = email;

    try {
      await sendgrid.sendMultiple({
        ...mail,
        ...(isHtml ? { html: content } : { text: content })
      });
    } catch (e) {
      throw new InternalServerErrorException('Unable to send emails.');
    }
  }
}
