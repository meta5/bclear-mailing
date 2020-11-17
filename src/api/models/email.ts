export class Email {
  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly subject: string,
    public readonly content: string,
    public readonly isHtml: boolean
  ) {}
}
