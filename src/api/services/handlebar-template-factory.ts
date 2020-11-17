import { TemplateFactory } from '../services/template-factory';
import { Templates } from '../repositories/templates';
import { Template } from '../models/template';
import { BadRequestException, Inject } from '@nestjs/common';
import { TemplateRenderContext } from '@meta5/nestjs-shared';
import { compile } from 'handlebars';

export class HandlebarTemplateFactory implements TemplateFactory {
  constructor(@Inject(Templates) private readonly templates: Templates) {}

  public async createTemplate(
    templateName: string,
    templateRenderContext: TemplateRenderContext = {}
  ): Promise<string> {
    const template: Template | undefined = await this.templates.findByName(
      templateName
    );

    if (!template) {
      throw new BadRequestException('Email template is not supported.');
    }

    const compiled: HandlebarsTemplateDelegate =
      typeof template.content === 'string'
        ? compile(template.content)
        : template.content;

    return compiled(templateRenderContext);
  }
}
