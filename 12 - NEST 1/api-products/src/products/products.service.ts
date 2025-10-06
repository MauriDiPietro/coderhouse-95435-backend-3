import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private filePath = 'products.json';

  async writeFile(products: Product[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
  }

  async readFile(): Promise<Product[]> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const products = await this.readFile();
      const idNew = products.length + 1;
      const newProduct: Product = { ...createProductDto, id: idNew.toString() };
      if (!newProduct) throw new BadRequestException('Invalid product data');
      products.push(newProduct);
      await this.writeFile(products);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Product[]> {
    return this.readFile();
  }

  async findOne(id: string): Promise<Product> {
    try {
      const products = await this.readFile();
      const product = products.find((prod) => prod.id === id) || null;
      if (!product) throw new NotFoundException('Product not found');
      return product;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
