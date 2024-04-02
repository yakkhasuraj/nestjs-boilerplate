import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';

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
