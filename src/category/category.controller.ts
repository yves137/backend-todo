import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // GET category endpoint
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
    type: [CreateCategoryDto],
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred.',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  // POST category endpoint
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Category has been successfully created.',
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'The request was malformed, e.g. missing or invalid parameter or property in the request body.',
  })
  @ApiResponse({
    status: 409,
    description: 'Category Name already exists.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred.',
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'Json structure for Category object',
  })
  async create(@Body(ValidationPipe) category: CreateCategoryDto) {
    return await this.categoryService.create({
      id: uuidv4(),
      ...category,
    });
  }

  // DELETE category endpoint
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Category is successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description:
      'The request ID was malformed, It must be a valid format of UUID.',
  })
  @ApiResponse({
    status: 404,
    description: 'categoryId is not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Some tasks are still referencing this category.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred.',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.categoryService.delete(id);
  }
}
