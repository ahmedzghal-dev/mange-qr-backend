import { IsString, IsNotEmpty, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Cheeseburger'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 9.99
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Juicy burger with cheese',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The UUID of the category this product belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsUUID(4)
  @IsNotEmpty()
  categoryId: string;
} 