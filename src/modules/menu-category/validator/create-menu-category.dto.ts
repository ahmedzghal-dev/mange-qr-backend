import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuCategoryDto {
  @ApiProperty({
    description: 'The UUID of the menu',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsUUID(4)
  @IsNotEmpty()
  menuId: string;

  @ApiProperty({
    description: 'The UUID of the category',
    example: '123e4567-e89b-12d3-a456-426614174001',
    format: 'uuid'
  })
  @IsUUID(4)
  @IsNotEmpty()
  categoryId: string;
} 