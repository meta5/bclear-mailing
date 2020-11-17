import { IsDefined, IsEmail } from 'class-validator';

export class Sendgrid {
  @IsDefined()
  public readonly apiKey: string;

  @IsDefined()
  @IsEmail()
  public readonly from: string;

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY;
    this.from = process.env.SENDER_EMAIL;
  }
}
