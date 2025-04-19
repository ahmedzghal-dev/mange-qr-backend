import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './modules/menu/menu.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { MenuCategoryModule } from './modules/menu-category/menu-category.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    MenuModule,
    CategoryModule,
    ProductModule,
    MenuCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
