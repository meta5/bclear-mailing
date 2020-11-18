import { IsDefined, IsEmail } from 'class-validator';

export class Mails {
  @IsDefined()
  @IsEmail()
  public readonly from: string;

  constructor() {
    this.from = process.env.SENDER_EMAIL;
  }
}
