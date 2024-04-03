import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { ParseIntPipe } from 'src/common/pipe/parse-int.pipe';

// To create a controller using the CLI, simply execute the `nest g controller cats` command
// Fastify lacks support for nested routers
// @Controller({ host: 'example.com' })
@Controller('cats')
export class CatsController {
  // If your class doesn't extend another class, you should always prefer using constructor-based injection
  constructor(private catsService: CatsService) {}

  @Get()
  // A wildcard in the middle of the route is only supported by express.
  // @Get('ab*cd')

  // Redirect a response to a specific URL using a @Redirect() decorator
  // @Redirect('/', 301)
  async findAll(
    // Provide default values
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ): Promise<Cat[]> {
    console.log(activeOnly, page);
    // return this.catsService.findAll();

    // Send standard HTTP response objects when error occurs
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new ForbiddenException();
  }

  // Routes with parameters should be declared after any static paths
  @Get(':id')
  // Select an existing user entity from the database using an id supplied in the request
  // Makes code more declarative and DRY by abstracting boilerplate code out
  // findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
  // Transform or Validate arguments
  findOne(@Param('id', ParseIntPipe) id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  // Change default status code by adding the @HttpCode(...) decorator at a handler level
  // @HttpCode(204)

  // Specify a custom response header using a @Header() decorator
  // @Header('Cache-Control', 'none')

  // Prefer applying filters by using classes instead of instances when possible
  // @UseFilters(new HttpExceptionFilter())

  // Schema-based validation
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  // create(@Body() createCatDto: CreateCatDto) {

  // Decorator-based validation
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Put(':id/:name')
  name(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
