import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../validator/create-category.dto';
import { UpdateCategoryDto } from '../validator/update-category.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the category' })
  @ApiResponse({ status: 200, description: 'Return the category.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the category' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'The category has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the category' })
  @ApiResponse({ status: 200, description: 'The category has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
} 