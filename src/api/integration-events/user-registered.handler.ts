import { Mailer } from '../services/mailer';
import { UserRegisteredEvent } from './user.registered.event';
import { Urls } from '../../config/urls';
import {
  HandleIntegrationEvent,
  IntegrationEventHandler,
  Recipient
} from '@meta5/nestjs-shared';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@HandleIntegrationEvent('user_registered_event')
export class UserRegisteredHandler
  implements
    IntegrationEventHandler<'user_registered_event', UserRegisteredEvent> {
  constructor(
    @Inject(Urls)
    private readonly urls: Urls,
    @Inject(JwtService)
    private readonly jwt: JwtService,
    @Inject(Mailer) private readonly mailer: Mailer
  ) {}

  public async handle(
    _: string,
    { email, name }: UserRegisteredEvent
  ): Promise<void> {
    const token: string = await this.jwt.signAsync(
      {
        email
      },
      { expiresIn: '1 day' }
    );
    const confirmationUrl = `${this.urls.publicUrl}/users/confirm?token=${token}`;

    await this.mailer.sendMany(
      [new Recipient(email, name)],
      'confirmation',
      'Confirm Email to activate account',
      { name, email, confirmationUrl }
    );
  }
}
