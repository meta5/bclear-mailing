import { TemplateRenderContext } from '@meta5/nestjs-shared';

export interface TemplateFactory {
  createTemplate(
    templateName: string,
    templateRenderContext?: TemplateRenderContext
  ): Promise<string>;
}

export const TemplateFactory: symbol = Symbol.for('TemplateFactory');
