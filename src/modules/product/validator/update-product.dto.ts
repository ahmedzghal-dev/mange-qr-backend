import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Cheeseburger Deluxe',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 10.99,
    required: false
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Deluxe juicy burger with premium cheese',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The UUID of the category this product belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
    required: false
  })
  @IsUUID(4)
  @IsOptional()
  categoryId?: string;
} 