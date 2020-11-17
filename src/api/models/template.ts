export class Template {
  public static readonly CONFIRMATION = 'confirmation';

  constructor(
    public readonly name: string,
    public readonly content: string | HandlebarsTemplateDelegate
  ) {}
}
