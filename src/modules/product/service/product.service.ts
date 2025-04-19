import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDto } from '../validator/create-product.dto';
import { UpdateProductDto } from '../validator/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, description, categoryId } = createProductDto;
    
    return this.productRepository.create({
      name,
      price,
      description,
      category: {
        connect: { categoryId }
      }
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const { name, price, description, categoryId } = updateProductDto;
    
    // First ensure the product exists
    await this.findOne(id);
    
    const updateData: any = {};
    
    if (name !== undefined) {
      updateData.name = name;
    }
    
    if (price !== undefined) {
      updateData.price = price;
    }
    
    if (description !== undefined) {
      updateData.description = description;
    }
    
    if (categoryId !== undefined) {
      updateData.category = {
        connect: { categoryId }
      };
    }
    
    return this.productRepository.update(id, updateData);
  }

  async remove(id: string): Promise<Product> {
    // First ensure the product exists
    await this.findOne(id);
    
    return this.productRepository.remove(id);
  }
} 