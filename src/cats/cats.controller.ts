import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

// To create a controller using the CLI, simply execute the `nest g controller cats` command
// Fastify lacks support for nested routers
// @Controller({ host: 'example.com' })
@Controller('cats')
export class CatsController {
  @Get()
  // A wildcard in the middle of the route is only supported by express.
  // @Get('ab*cd')

  // Redirect a response to a specific URL using a @Redirect() decorator
  // @Redirect('/', 301)
  async findAll(): Promise<unknown[]> {
    return [];
  }

  // Routes with parameters should be declared after any static paths
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  // Change default status code by adding the @HttpCode(...) decorator at a handler level
  // @HttpCode(204)

  // Specify a custom response header using a @Header() decorator
  // @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);
    return 'This action adds a new cat';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
