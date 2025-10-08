// npm i class-validator class-transformer

import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  @MinLength(5)
  description: string;

  @IsNumber()
  stock: number;

}
