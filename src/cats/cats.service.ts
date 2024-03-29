import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// To create a service using the CLI, simply execute the `nest g service cats` command
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }

  create(cat: Cat) {
    this.cats.push(cat);
  }
}
