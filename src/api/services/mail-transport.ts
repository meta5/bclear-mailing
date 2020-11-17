import { Email } from '../models/email';

export interface MailTransport {
  sendMail(email: Email): Promise<void>;
}

export const MailTransport: symbol = Symbol.for('MailTransport');
