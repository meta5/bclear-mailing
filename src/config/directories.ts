import { IsDefined } from 'class-validator';

export class Directories {
  @IsDefined()
  public readonly mailingTemplateDirectory: string;

  constructor() {
    this.mailingTemplateDirectory = process.env.TEMPLATE_DIRECTORY;
  }
}
