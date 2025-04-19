import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        products: true,
        subCategories: true,
        parentCategory: true,
        menus: {
          include: {
            menu: true,
          },
        },
      },
    });
  }

  async findOne(categoryId: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { categoryId },
      include: {
        products: true,
        subCategories: true,
        parentCategory: true,
        menus: {
          include: {
            menu: true,
          },
        },
      },
    });
  }

  async update(categoryId: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.category.update({
      where: { categoryId },
      data,
    });
  }

  async remove(categoryId: string): Promise<Category> {
    return this.prisma.category.delete({
      where: { categoryId },
    });
  }
} 