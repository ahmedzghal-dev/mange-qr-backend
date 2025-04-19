import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryDto } from '../validator/create-category.dto';
import { UpdateCategoryDto } from '../validator/update-category.dto';

// Define an interface for Category with relations
interface CategoryWithRelations extends Category {
  subCategories?: Category[];
  products?: any[];
}

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name, parentCategoryId } = createCategoryDto;
    
    const categoryData: any = { name };
    
    if (parentCategoryId) {
      // Check if parent category exists
      const parentCategory = await this.categoryRepository.findOne(parentCategoryId);
      if (!parentCategory) {
        throw new NotFoundException(`Parent category with ID ${parentCategoryId} not found`);
      }
      
      categoryData.parentCategory = {
        connect: { categoryId: parentCategoryId }
      };
    }
    
    return this.categoryRepository.create(categoryData);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const { name, parentCategoryId } = updateCategoryDto;
    
    // First ensure the category exists
    await this.findOne(id);
    
    const updateData: any = {};
    
    if (name) {
      updateData.name = name;
    }
    
    if (parentCategoryId !== undefined) {
      if (parentCategoryId === null) {
        // Remove parent category relationship
        updateData.parentCategory = { disconnect: true };
      } else {
        // Check if parent category exists
        const parentCategory = await this.categoryRepository.findOne(parentCategoryId);
        if (!parentCategory) {
          throw new NotFoundException(`Parent category with ID ${parentCategoryId} not found`);
        }
        
        // Prevent circular reference
        if (parentCategoryId === id) {
          throw new Error('A category cannot be its own parent');
        }
        
        updateData.parentCategory = {
          connect: { categoryId: parentCategoryId }
        };
      }
    }
    
    return this.categoryRepository.update(id, updateData);
  }

  async remove(id: string): Promise<Category> {
    // First ensure the category exists and load with relations
    const category = await this.categoryRepository.findOne(id) as CategoryWithRelations;
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    
    // Check if the category has subcategories or products
    if (category.subCategories && category.subCategories.length > 0) {
      throw new Error('Cannot delete a category that has subcategories');
    }
    
    if (category.products && category.products.length > 0) {
      throw new Error('Cannot delete a category that has products');
    }
    
    return this.categoryRepository.remove(id);
  }
} 