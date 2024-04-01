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

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
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
