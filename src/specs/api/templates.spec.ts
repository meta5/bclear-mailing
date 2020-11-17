import { Test, TestingModule } from '@nestjs/testing';
import { Templates } from '../../api/repositories/templates';
import { InMemoryTemplates } from '../../api/repositories/in-memory-templates';
import { Template } from '../../api/models/template';
import {
  ConfigFactoryModule,
  ConfigProviderFactory
} from '@meta5/nestjs-config';
import { Directories } from '../../config/directories';
import { SharedModule } from '@meta5/nestjs-shared';

describe('Templates', () => {
  let templates: Templates;

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
            return new InMemoryTemplates(directories);
          }
        }
      ]
    }).compile();

    templates = moduleRef.get(Templates);
  });

  it('should find template by name', async () => {
    const template: Template = await templates.findByName(
      Template.CONFIRMATION
    );
    expect(template).toBeDefined();
    expect(typeof template.content).toBe('string');
    expect(template.name).toBe(Template.CONFIRMATION);
  });

  it('should find all templates', async () => {
    const entities: Template[] = await templates.findAll();
    expect(Array.isArray(entities)).toBe(true);
    expect(entities.length).toBeGreaterThan(0);
  });

  it('should return undefined if template by name cannot be found', async () => {
    const template: Template | undefined = await templates.findByName(
      'notFound'
    );
    expect(template).toBeUndefined();
  });
});
