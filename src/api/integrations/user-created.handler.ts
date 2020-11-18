import { Mailer } from '../services/mailer';
import { Urls } from '../../config/urls';
import {
  HandleIntegrationEvent,
  IntegrationEventHandler,
  Recipient
} from '@meta5/nestjs-shared';
import { Inject } from '@nestjs/common';

interface UserCreatedEvent {
  name: string;
  email: string;
  oneTimePassword: string;
}

@HandleIntegrationEvent('user_created_event')
export class UserCreatedHandler
  implements IntegrationEventHandler<UserCreatedEvent> {
  constructor(
    @Inject(Urls)
    private readonly urls: Urls,
    @Inject(Mailer) private readonly mailer: Mailer
  ) {}

  public async handle({
    email,
    name,
    oneTimePassword
  }: UserCreatedEvent): Promise<void> {
    await this.mailer.sendMany(
      [new Recipient(email, name)],
      'welcome',
      'Welcome to BClear.',
      {
        name,
        email,
        oneTimePassword,
        publicUrl: this.urls.publicUrl
      }
    );
  }
}
