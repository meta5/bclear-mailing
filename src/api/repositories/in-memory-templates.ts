import { Templates } from '../repositories/templates';
import { Template } from '../models/template';
import { Directories } from '../../config/directories';
import { promises } from 'fs';
import { join } from 'path';

export class InMemoryTemplates implements Templates {
  public static readonly SUPPORTED_TEMPLATES: string[] = [Template.WELCOME];

  constructor(
    private readonly directories: Directories,
    private readonly preloadedTemplates: Map<string, Template> = new Map<
      string,
      Template
    >()
  ) {}

  public async findAll(): Promise<Template[]> {
    return Promise.all(
      InMemoryTemplates.SUPPORTED_TEMPLATES.map((template: string) =>
        this.findByName(template)
      )
    );
  }

  public async findByName(name: string): Promise<Template | undefined> {
    try {
      const preloaded: Template | undefined = this.preloadedTemplates.get(name);

      if (preloaded) {
        return preloaded;
      }

      const content = await promises.readFile(
        join(
          this.directories.mailingTemplateDirectory,
          `${name}.template.html`
        ),
        'utf-8'
      );

      const template: Template = new Template(name, content);
      this.preloadedTemplates.set(name, template);

      return template;
    } catch (e) {
      return undefined;
    }
  }
}
