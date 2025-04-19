import { Injectable } from '@nestjs/common';
import { MenuCategory, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma/prisma.service';

@Injectable()
export class MenuCategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MenuCategoryCreateInput): Promise<MenuCategory> {
    return this.prisma.menuCategory.create({
      data,
    });
  }

  async findAll(): Promise<MenuCategory[]> {
    return this.prisma.menuCategory.findMany({
      include: {
        menu: true,
        category: true,
      },
    });
  }

  async findByMenuId(menuId: string): Promise<MenuCategory[]> {
    return this.prisma.menuCategory.findMany({
      where: { menuId },
      include: {
        category: true,
      },
    });
  }

  async findByCategoryId(categoryId: string): Promise<MenuCategory[]> {
    return this.prisma.menuCategory.findMany({
      where: { categoryId },
      include: {
        menu: true,
      },
    });
  }

  async findOne(menuId: string, categoryId: string): Promise<MenuCategory | null> {
    return this.prisma.menuCategory.findUnique({
      where: {
        menuId_categoryId: {
          menuId,
          categoryId,
        },
      },
      include: {
        menu: true,
        category: true,
      },
    });
  }

  async remove(menuId: string, categoryId: string): Promise<MenuCategory> {
    return this.prisma.menuCategory.delete({
      where: {
        menuId_categoryId: {
          menuId,
          categoryId,
        },
      },
    });
  }
} 