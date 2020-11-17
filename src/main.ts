/* eslint-disable */
import { BClearMailingModule } from './bclear-mailing.module';
import { ModuleAppFactory } from '@meta5/nestjs-shared';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await new ModuleAppFactory().createSingletonApp(
    BClearMailingModule
  );
  const PORT = app.get(ConfigService).get('PORT');
  await app.listen(PORT);
  console.log(`App listening on: http://localhost:${PORT}`);
  console.log(`App listening swagger: http://localhost:${PORT}/api/docs`);
}

bootstrap().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
});
