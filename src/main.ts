import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Create a global-scoped filter
  // `useGlobalFilters()` method does not set up filters for gateways or hybrid applications
  // app.useGlobalFilters(new HttpExceptionFilter());
  // Setup a global-scoped pipe
  // app.useGlobalPipes(new ValidationPipe());
  // Setup a global-scoped guard
  // app.useGlobalGuards(new RolesGuard());
  // Setup a global-scoped interceptor
  // app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000);
}
bootstrap();
