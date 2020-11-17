import { Email } from '../models/email';

export class EmailBuilder {
  private from?: string;
  private to?: string[];
  private subject?: string;
  private content?: string;
  private isHtml?: boolean;

  public addRecipient(...recipients: string[]): EmailBuilder {
    this.to = recipients;

    return this;
  }

  public addSender(sender: string): EmailBuilder {
    this.from = sender;

    return this;
  }

  public addSubject(subject: string): EmailBuilder {
    this.subject = subject;

    return this;
  }

  public addContent(content: string, isHtml: boolean = false): EmailBuilder {
    this.content = content;
    this.isHtml = isHtml;

    return this;
  }

  public build(): Email {
    return new Email(
      this.from,
      this.to.join(),
      this.subject,
      this.content,
      this.isHtml
    );
  }
}
