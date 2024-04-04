import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RolesGuard } from './common/guard/role.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { ErrorsInterceptor } from './common/interceptor/errors.interceptor';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // Register global-scoped filter with dependency injection
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // Setup global-scoped pipe with dependency injection
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // Setup global-scope guard with dependency injection
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // Setup global-scope interceptor with dependency injection
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.GET }, 'cats/(.*)')
      // .forRoutes('cats')
      // Restrict a middleware to a particular request method
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      // fastify doesn't supports wildcard asterisks *
      .forRoutes({ path: 'c(.*)', method: RequestMethod.ALL });
  }
}
