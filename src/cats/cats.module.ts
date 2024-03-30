import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// To create a module using the CLI, simply execute the `nest g module cats` command
// A set of providers which should be available everywhere out-of-the-box
// @Global()
@Module({
  // Set of controllers defined in this module
  controllers: [CatsController],
  // Providers that will be instantiated by the Nest injector
  providers: [CatsService],
  // Subset of providers that are provided by this module
  exports: [CatsService],
})
export class CatsModule {}
