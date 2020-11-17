import { Template } from '../models/template';

export interface Templates {
  findAll(): Promise<Template[]>;

  findByName(templateName: string): Promise<Template | undefined>;
}

export const Templates: symbol = Symbol.for('Templates');
