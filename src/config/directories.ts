import { IsDefined } from 'class-validator';
import { resolve } from 'path';

export class Directories {
  @IsDefined()
  public readonly mailingTemplateDirectory: string;

  constructor() {
    this.mailingTemplateDirectory = resolve(
      __dirname,
      process.env.TEMPLATE_DIRECTORY ?? '../../dist/templates'
    );
  }
}
