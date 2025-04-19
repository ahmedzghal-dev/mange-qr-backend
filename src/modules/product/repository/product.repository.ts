import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma/prisma.service';


@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(productId: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { productId },
      include: {
        category: true,
      },
    });
  }

  async update(productId: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { productId },
      data,
    });
  }

  async remove(productId: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { productId },
    });
  }
} 