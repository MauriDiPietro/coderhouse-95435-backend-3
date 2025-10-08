import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.ProductModel.create(createProductDto);
    if(!product) throw new BadRequestException('Error al crear el producto');
    return product;
  }

  async findAll() {
    const products = await this.ProductModel.find();
    if(!products) throw new NotFoundException('Error al obtener la lista de productos');
    return products;
  }

  async findOne(id: string) {
    const product = await this.ProductModel.findById(id);
    if(!product) throw new NotFoundException('Error al obtener el producto');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productUpdate = await this.ProductModel.findByIdAndUpdate(id, updateProductDto);
    if(!productUpdate) throw new NotFoundException('Error al actualizar el producto');
    return productUpdate;
  }

  async remove(id: string) {
    const productDelete = await this.ProductModel.findByIdAndDelete(id);
    if(!productDelete) throw new NotFoundException('Error al eliminar el producto');
    return productDelete;
  }
}
