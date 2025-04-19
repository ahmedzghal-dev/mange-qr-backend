import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuCategory } from '@prisma/client';
import { MenuCategoryRepository } from '../repository/menu-category.repository';
import { CreateMenuCategoryDto } from '../validator/create-menu-category.dto';

@Injectable()
export class MenuCategoryService {
  constructor(private menuCategoryRepository: MenuCategoryRepository) {}

  async create(createMenuCategoryDto: CreateMenuCategoryDto): Promise<MenuCategory> {
    const { menuId, categoryId } = createMenuCategoryDto;
    
    // Check if the relation already exists
    const existing = await this.menuCategoryRepository.findOne(menuId, categoryId);
    if (existing) {
      return existing; // Relation already exists, return it
    }
    
    return this.menuCategoryRepository.create({
      menu: {
        connect: { menuId }
      },
      category: {
        connect: { categoryId }
      }
    });
  }

  async findAll(): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.findAll();
  }

  async findByMenuId(menuId: string): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.findByMenuId(menuId);
  }

  async findByCategoryId(categoryId: string): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.findByCategoryId(categoryId);
  }

  async findOne(menuId: string, categoryId: string): Promise<MenuCategory> {
    const menuCategory = await this.menuCategoryRepository.findOne(menuId, categoryId);
    if (!menuCategory) {
      throw new NotFoundException(`Menu-Category relation with menuId ${menuId} and categoryId ${categoryId} not found`);
    }
    return menuCategory;
  }

  async remove(menuId: string, categoryId: string): Promise<MenuCategory> {
    // First ensure the relation exists
    await this.findOne(menuId, categoryId);
    
    return this.menuCategoryRepository.remove(menuId, categoryId);
  }
} 