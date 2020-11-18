import { Mailer } from '../services/mailer';
import { TemplateFactory } from '../services/template-factory';
import { EmailBuilder } from '../services/email-builder';
import { Email } from '../models/email';
import { MailTransport } from '../services/mail-transport';
import { Mails } from '../../config/mails';
import { BadRequestException, Inject } from '@nestjs/common';
import { Recipient, TemplateRenderContext } from '@meta5/nestjs-shared';

export class DefaultMailer implements Mailer {
  constructor(
    @Inject(TemplateFactory) private readonly templateFactory: TemplateFactory,
    @Inject(Mails) private readonly mails: Mails,
    @Inject(MailTransport) private readonly mailTransport: MailTransport
  ) {}

  public async sendMany(
    recipients: Recipient[],
    templateName: string,
    subject: string,
    templateRenderContext: TemplateRenderContext = {}
  ): Promise<void> {
    if (!recipients.length) {
      throw new BadRequestException('No recipients supplied.');
    }

    const uniqueEmails: Set<string> = new Set<string>(
      recipients.map((x: Recipient) => x.email)
    );

    if (uniqueEmails.size !== recipients.length) {
      throw new BadRequestException('Duplicate emails provided.');
    }

    const content: string = await this.templateFactory.createTemplate(
      templateName,
      templateRenderContext
    );

    const email: Email = new EmailBuilder()
      .addSender(this.mails.from)
      .addRecipient(...recipients.map((x: Recipient) => x.email))
      .addContent(content, true)
      .addSubject(subject)
      .build();

    await this.mailTransport.sendMail(email);
  }
}
