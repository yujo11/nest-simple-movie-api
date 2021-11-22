import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This action returns all movies';
  }

  @Get('search')
  search(@Query('year') searchYear: string) {
    return `This will search for a movie ${searchYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This action returns one movie ${id}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `This will delete a movie ${id}`;
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return {
      updateMovie: id,
      ...updateData,
    };
  }
}
