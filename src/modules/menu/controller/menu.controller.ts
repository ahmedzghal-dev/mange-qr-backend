import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from '../service/menu.service';
import { CreateMenuDto } from '../validator/create-menu.dto';
import { UpdateMenuDto } from '../validator/update-menu.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('menus')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: 'Create a new menu' })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({ status: 201, description: 'The menu has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, description: 'Return all menus.' })
  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @ApiOperation({ summary: 'Get a menu by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the menu' })
  @ApiResponse({ status: 200, description: 'Return the menu.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a menu' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the menu' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({ status: 200, description: 'The menu has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @ApiOperation({ summary: 'Delete a menu' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the menu' })
  @ApiResponse({ status: 200, description: 'The menu has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
} 