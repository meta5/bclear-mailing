export class Template {
  public static readonly WELCOME = 'welcome';

  constructor(
    public readonly name: string,
    public readonly content: string | HandlebarsTemplateDelegate
  ) {}
}
