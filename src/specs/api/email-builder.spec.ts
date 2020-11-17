import { EmailBuilder } from '../../api/services/email-builder';
import { Email } from '../../api/models/email';

describe('EmailBuilder', () => {
  let emailBuilder: EmailBuilder;

  beforeEach(() => {
    emailBuilder = new EmailBuilder();
  });

  it('should build full email as html', () => {
    const email: Email = emailBuilder
      .addSender('sender@email.com')
      .addSubject('Test')
      .addContent('<h1>Test</h1>', true)
      .addRecipient('recipient@email.com')
      .build();

    expect(email).toMatchObject({
      from: 'sender@email.com',
      to: 'recipient@email.com',
      subject: 'Test',
      content: '<h1>Test</h1>',
      isHtml: true
    });
  });

  it('should build full email as plain text', () => {
    const email: Email = emailBuilder
      .addSender('sender@email.com')
      .addSubject('Test')
      .addContent('Content')
      .addRecipient('recipient@email.com')
      .build();

    expect(email).toMatchObject({
      from: 'sender@email.com',
      to: 'recipient@email.com',
      subject: 'Test',
      content: 'Content',
      isHtml: false
    });
  });
});
