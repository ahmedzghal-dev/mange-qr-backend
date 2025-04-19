import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {} 