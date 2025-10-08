import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsString()
  role?: string;
}
