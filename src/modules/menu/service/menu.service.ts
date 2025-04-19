import { Injectable, NotFoundException } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { MenuRepository } from '../repository/menu.repository';
import { CreateMenuDto } from '../validator/create-menu.dto';
import { UpdateMenuDto } from '../validator/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private menuRepository: MenuRepository) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const { name, categoryIds = [] } = createMenuDto;

    return this.menuRepository.create({
      name,
      categories: {
        create: categoryIds.map(categoryId => ({
          category: {
            connect: { categoryId }
          }
        }))
      }
    });
  }

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.findAll();
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.menuRepository.findOne(id);
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const { name, categoryIds } = updateMenuDto;
    
    // First ensure the menu exists
    await this.findOne(id);
    
    const updateData: any = {};
    
    if (name) {
      updateData.name = name;
    }
    
    if (categoryIds) {
      // If categoryIds are provided, delete existing relations and create new ones
      updateData.categories = {
        deleteMany: {},
        create: categoryIds.map(categoryId => ({
          category: {
            connect: { categoryId }
          }
        }))
      };
    }
    
    return this.menuRepository.update(id, updateData);
  }

  async remove(id: string): Promise<Menu> {
    // First ensure the menu exists
    await this.findOne(id);
    
    return this.menuRepository.remove(id);
  }
} 