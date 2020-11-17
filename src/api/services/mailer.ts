import { Recipient, TemplateRenderContext } from '@meta5/nestjs-shared';

export interface Mailer {
  sendMany(
    recipients: Recipient[],
    templateName: string,
    subject: string,
    templateRenderContext?: TemplateRenderContext
  ): Promise<void>;
}

export const Mailer: symbol = Symbol.for('Mailer');
