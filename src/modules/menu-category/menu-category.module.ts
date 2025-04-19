import { Module } from '@nestjs/common';
import { MenuCategoryController } from './controller/menu-category.controller';
import { MenuCategoryService } from './service/menu-category.service';
import { MenuCategoryRepository } from './repository/menu-category.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService, MenuCategoryRepository],
  exports: [MenuCategoryService],
})
export class MenuCategoryModule {} 