import { IsDefined } from 'class-validator';
import { Env } from '@meta5/nestjs-config';
import { resolve } from 'path';

export class Directories {
  @IsDefined()
  public readonly mailingTemplateDirectory: string;

  constructor() {
    this.mailingTemplateDirectory = resolve(
      __dirname,
      '../../',
      process.env.NODE_ENV === Env.DEVELOPMENT ? 'src' : 'dist',
      'templates'
    );
  }
}
