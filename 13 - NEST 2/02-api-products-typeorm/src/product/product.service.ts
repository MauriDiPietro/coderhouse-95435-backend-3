import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: Partial<Product>) {
    const product = await this.productRepository.create(createProductDto);
    if (!product) throw new BadRequestException('Error al crear el producto');
    return product;
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({
      _id: new (require('mongodb').ObjectId)(id),
    });
    if (!product) throw new NotFoundException('Error al obtener el producto');
    return product;
  }

  async update(id: string, updateProductDto: Partial<Product>) {
    const productUpdate = await this.productRepository.update(
      { _id: new (require('mongodb').ObjectId)(id) },
      updateProductDto,
    );
    if (!productUpdate)
      throw new NotFoundException('Error al actualizar el producto');
    return productUpdate;
  }

  async remove(id: string) {
    const productDelete = await this.productRepository.delete({
      _id: new (require('mongodb').ObjectId)(id),
    });
    if (!productDelete)
      throw new NotFoundException('Error al eliminar el producto');
    return productDelete;
  }
}
