import { Module } from '@nestjs/common';
import { MenuController } from './controller/menu.controller';
import { MenuService } from './service/menu.service';
import { MenuRepository } from './repository/menu.repository';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [MenuController],
  providers: [MenuService, MenuRepository],
  exports: [MenuService],
})
export class MenuModule {} 