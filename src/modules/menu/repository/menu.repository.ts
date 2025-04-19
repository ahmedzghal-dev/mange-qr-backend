import { Injectable } from '@nestjs/common';
import { Menu, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma/prisma.service';

@Injectable()
export class MenuRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MenuCreateInput): Promise<Menu> {
    return this.prisma.menu.create({
      data,
    });
  }

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findOne(menuId: string): Promise<Menu | null> {
    return this.prisma.menu.findUnique({
      where: { menuId },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async update(menuId: string, data: Prisma.MenuUpdateInput): Promise<Menu> {
    return this.prisma.menu.update({
      where: { menuId },
      data,
    });
  }

  async remove(menuId: string): Promise<Menu> {
    return this.prisma.menu.delete({
      where: { menuId },
    });
  }
} 