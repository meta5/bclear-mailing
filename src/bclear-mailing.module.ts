import { Templates } from './api/repositories/templates';
import { InMemoryTemplates } from './api/repositories/in-memory-templates';
import { TemplateFactory } from './api/services/template-factory';
import { HandlebarTemplateFactory } from './api/services/handlebar-template-factory';
import { Mailer } from './api/services/mailer';
import { DefaultMailer } from './api/services/default-mailer';
import { Template } from './api/models/template';
import { MailTransport } from './api/services/mail-transport';
import { SendgridMailTransport } from './api/services/sendgrid-mail-transport';
import { Directories } from './config/directories';
import { Sendgrid } from './config/sendgrid';
import { UserCreatedHandler } from './api/integrations/user-created.handler';
import { Urls } from './config/urls';
import {
  SharedModule,
  IntegrationEventHandlerType
} from '@meta5/nestjs-shared';
import {
  ConfigFactoryModule,
  ConfigProviderFactory
} from '@meta5/nestjs-config';
import { Module } from '@nestjs/common';
import { compile } from 'handlebars';
import { promises } from 'fs';
import { join } from 'path';

const integrations: IntegrationEventHandlerType[] = [UserCreatedHandler];

@Module({
  imports: [SharedModule, ConfigFactoryModule],
  providers: [
    ...integrations,
    { provide: Mailer, useClass: DefaultMailer },
    { provide: MailTransport, useClass: SendgridMailTransport },
    { provide: TemplateFactory, useClass: HandlebarTemplateFactory },
    ...[Directories, Sendgrid, Urls].map((x) => ({
      provide: x,
      inject: [ConfigProviderFactory],
      useFactory: (factory: ConfigProviderFactory) => factory.createProvider(x)
    })),
    {
      provide: Templates,
      inject: [Directories],
      useFactory: async (
        directories: Directories
      ): Promise<InMemoryTemplates> => {
        const reading: Promise<
          [string, Template]
        >[] = InMemoryTemplates.SUPPORTED_TEMPLATES.map(
          async (template: string) => {
            const content = await promises.readFile(
              join(
                directories.mailingTemplateDirectory,
                `${template}.template.html`
              ),
              'utf-8'
            );

            return [template, new Template(template, compile(content))] as [
              string,
              Template
            ];
          }
        );

        const preloaded: [string, Template][] = await Promise.all(reading);

        return new InMemoryTemplates(
          directories,
          new Map<string, Template>(preloaded)
        );
      }
    }
  ]
})
export class BClearMailingModule {
  public readonly integrations: IntegrationEventHandlerType[] = integrations;
}
