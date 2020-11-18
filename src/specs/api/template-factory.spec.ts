import { Templates } from '../../api/repositories/templates';
import { InMemoryTemplates } from '../../api/repositories/in-memory-templates';
import { TemplateFactory } from '../../api/services/template-factory';
import { HandlebarTemplateFactory } from '../../api/services/handlebar-template-factory';
import { Template } from '../../api/models/template';
import { Directories } from '../../config/directories';
import {
  ConfigProviderFactory,
  ConfigFactoryModule
} from '@meta5/nestjs-config';
import { Test, TestingModule } from '@nestjs/testing';
import { promises } from 'fs';
import { join } from 'path';
import { compile } from 'handlebars';
import { SharedModule } from '@meta5/nestjs-shared';

describe('TemplateFactory', () => {
  let templateFactory: TemplateFactory;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, ConfigFactoryModule],
      providers: [
        {
          provide: Directories,
          inject: [ConfigProviderFactory],
          useFactory: (factory: ConfigProviderFactory) =>
            factory.createProvider(Directories)
        },
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
        }
      ]
    }).compile();

    templateFactory = moduleRef.get(TemplateFactory);
  });

  it('should render not preloaded template', async () => {
    const template: string = await templateFactory.createTemplate(
      Template.WELCOME,
      {}
    );

    expect(template).toBeDefined();
  });

  it('should render preloaded template', async () => {
    const template: string = await templateFactory.createTemplate('stub', {});

    expect(template).toBeDefined();
    expect(template).toBeDefined();
  });

  it('should throw if template does not exist', async () => {
    try {
      await templateFactory.createTemplate('notFound');
      fail('Render non existing template.');
    } catch (e) {
      expect(e.message).toBe('Email template is not supported.');
    }
  });
});
