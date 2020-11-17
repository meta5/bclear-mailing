import { Templates } from '../../api/repositories/templates';
import { InMemoryTemplates } from '../../api/repositories/in-memory-templates';
import { TemplateFactory } from '../../api/services/template-factory';
import { HandlebarTemplateFactory } from '../../api/services/handlebar-template-factory';
import { Template } from '../../api/models/template';
import { Mailer } from '../../api/services/mailer';
import { DefaultMailer } from '../../api/services/default-mailer';
import { MailTransport } from '../../api/services/mail-transport';
import { StubMailTransport } from '../stubs/stub-mail-transport';
import { Directories } from '../../config/directories';
import { Sendgrid } from '../../config/sendgrid';
import { Urls } from '../../config/urls';
import { Recipient, SharedModule } from '@meta5/nestjs-shared';
import { Test, TestingModule } from '@nestjs/testing';
import { promises } from 'fs';
import { join } from 'path';
import { compile } from 'handlebars';
import {
  ConfigFactoryModule,
  ConfigProviderFactory
} from '@meta5/nestjs-config';

describe('Mailer', () => {
  let mailer: Mailer;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, ConfigFactoryModule],
      providers: [
        ...[Directories, Sendgrid, Urls].map((x) => ({
          provide: x,
          inject: [ConfigProviderFactory],
          useFactory: (factory: ConfigProviderFactory) =>
            factory.createProvider(x)
        })),
        {
          provide: Templates,
          inject: [Directories],
          useFactory: async (
            directories: Directories
          ): Promise<InMemoryTemplates> => {
            const content = await promises.readFile(
              join(directories.mailingTemplateDirectory, `stub.template.html`),
              'utf-8'
            );

            return new InMemoryTemplates(
              directories,
              new Map([['stub', new Template('stub', compile(content))]])
            );
          }
        },
        {
          provide: TemplateFactory,
          useClass: HandlebarTemplateFactory
        },
        {
          provide: MailTransport,
          useClass: StubMailTransport
        },
        {
          provide: Mailer,
          useClass: DefaultMailer
        }
      ]
    }).compile();

    mailer = moduleRef.get(Mailer);
  });

  it('should send mail', async () => {
    expect(mailer).toBeDefined();
    await mailer.sendMany(
      [new Recipient('test@email.com', 'name')],
      'stub',
      'Test',
      {}
    );
  });

  it('should throw if no recipients have been passed', async () => {
    try {
      await mailer.sendMany([], 'stub', 'Test', {});
      fail('Email sent to 0 recipients.');
    } catch (e) {
      expect(e.message).toBe('No recipients supplied.');
    }
  });

  it('should throw if duplicate recipients have been passed', async () => {
    try {
      await mailer.sendMany(
        [
          new Recipient('test@email.com', 'name'),
          new Recipient('test@email.com', 'name')
        ],
        'stub',
        'Test',
        {}
      );
      fail('Email sent to same recipients.');
    } catch (e) {
      expect(e.message).toBe('Duplicate emails provided.');
    }
  });

  it('should send without context passed', async () => {
    await mailer.sendMany(
      [new Recipient('test@email.com', 'name')],
      'stub',
      'Test'
    );
  });
});
