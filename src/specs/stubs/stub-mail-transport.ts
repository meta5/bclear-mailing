import { MailTransport } from '../../api/services/mail-transport';
import { Email } from '../../api/models/email';

export class StubMailTransport implements MailTransport {
  public async sendMail(_email: Email): Promise<void> {}
}
