import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MenuCategoryService } from '../service/menu-category.service';
import { CreateMenuCategoryDto } from '../validator/create-menu-category.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('menu-categories')
@Controller('menu-categories')
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @ApiOperation({ summary: 'Create a new menu-category relationship' })
  @ApiBody({ type: CreateMenuCategoryDto })
  @ApiResponse({ status: 201, description: 'The menu-category relationship has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @ApiOperation({ summary: 'Get all menu-category relationships' })
  @ApiResponse({ status: 200, description: 'Return all menu-category relationships.' })
  @Get()
  findAll() {
    return this.menuCategoryService.findAll();
  }

  @ApiOperation({ summary: 'Get menu-category relationships by menu ID' })
  @ApiParam({ name: 'menuId', type: 'string', description: 'ID of the menu' })
  @ApiResponse({ status: 200, description: 'Return menu-category relationships for the specified menu.' })
  @Get('menu/:menuId')
  findByMenuId(@Param('menuId') menuId: string) {
    return this.menuCategoryService.findByMenuId(menuId);
  }

  @ApiOperation({ summary: 'Get menu-category relationships by category ID' })
  @ApiParam({ name: 'categoryId', type: 'string', description: 'ID of the category' })
  @ApiResponse({ status: 200, description: 'Return menu-category relationships for the specified category.' })
  @Get('category/:categoryId')
  findByCategoryId(@Param('categoryId') categoryId: string) {
    return this.menuCategoryService.findByCategoryId(categoryId);
  }

  @ApiOperation({ summary: 'Get a specific menu-category relationship' })
  @ApiParam({ name: 'menuId', type: 'string', description: 'ID of the menu' })
  @ApiParam({ name: 'categoryId', type: 'string', description: 'ID of the category' })
  @ApiResponse({ status: 200, description: 'Return the menu-category relationship.' })
  @ApiResponse({ status: 404, description: 'Relationship not found.' })
  @Get(':menuId/:categoryId')
  findOne(@Param('menuId') menuId: string, @Param('categoryId') categoryId: string) {
    return this.menuCategoryService.findOne(menuId, categoryId);
  }

  @ApiOperation({ summary: 'Delete a menu-category relationship' })
  @ApiParam({ name: 'menuId', type: 'string', description: 'ID of the menu' })
  @ApiParam({ name: 'categoryId', type: 'string', description: 'ID of the category' })
  @ApiResponse({ status: 200, description: 'The menu-category relationship has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Relationship not found.' })
  @Delete(':menuId/:categoryId')
  remove(@Param('menuId') menuId: string, @Param('categoryId') categoryId: string) {
    return this.menuCategoryService.remove(menuId, categoryId);
  }
} 