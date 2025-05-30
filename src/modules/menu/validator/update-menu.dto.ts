import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiProperty({
    description: 'The name of the menu',
    example: 'Updated Menu',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Array of category IDs to be associated with this menu',
    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
    type: [String],
    required: false
  })
  @IsArray()
  @IsOptional()
  categoryIds?: string[];
} 