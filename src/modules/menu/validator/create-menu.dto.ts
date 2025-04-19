import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    description: 'The name of the menu',
    example: 'Main Menu'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

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