import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(
    req: FastifyRequest['raw'],
    res: FastifyReply['raw'],
    next: VoidFunction,
  ) {
    console.log('Request...');
    next();
  }
}
