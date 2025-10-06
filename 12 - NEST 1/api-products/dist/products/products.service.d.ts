import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private filePath;
    writeFile(products: Product[]): Promise<void>;
    readFile(): Promise<Product[]>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
