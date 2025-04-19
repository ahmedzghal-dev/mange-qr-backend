import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Premium Burgers',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The UUID of the parent category (if this is a subcategory)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
    required: false
  })
  @IsUUID(4)
  @IsOptional()
  parentCategoryId?: string;
} 