// npm i class-validator class-transformer

import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @MinLength(1)
  price: number;

  @IsString()
  @MinLength(5)
  description: string;
}
