import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../validator/create-product.dto';
import { UpdateProductDto } from '../validator/update-product.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the product' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the product' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
} 