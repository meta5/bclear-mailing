import { Mailer } from '../services/mailer';
import { TemplateFactory } from '../services/template-factory';
import { EmailBuilder } from '../services/email-builder';
import { Email } from '../models/email';
import { MailTransport } from '../services/mail-transport';
import { BadRequestException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Recipient, TemplateRenderContext } from '@meta5/nestjs-shared';

export class DefaultMailer implements Mailer {
  constructor(
    private readonly configService: ConfigService,
    @Inject(TemplateFactory) private readonly templateFactory: TemplateFactory,
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
      .addSender(this.configService.get<string>('email.from'))
      .addRecipient(...recipients.map((x: Recipient) => x.email))
      .addContent(content, true)
      .addSubject(subject)
      .build();

    await this.mailTransport.sendMail(email);
  }
}
