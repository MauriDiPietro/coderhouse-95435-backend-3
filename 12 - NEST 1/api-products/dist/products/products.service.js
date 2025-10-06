"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
let ProductsService = class ProductsService {
    filePath = 'products.json';
    async writeFile(products) {
        await fs_1.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
    }
    async readFile() {
        const data = await fs_1.promises.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    async create(createProductDto) {
        try {
            const products = await this.readFile();
            const idNew = products.length + 1;
            const newProduct = { ...createProductDto, id: idNew.toString() };
            if (!newProduct)
                throw new common_1.BadRequestException('Invalid product data');
            products.push(newProduct);
            await this.writeFile(products);
            return newProduct;
        }
        catch (error) {
            throw error;
        }
    }
    findAll() {
        return this.readFile();
    }
    async findOne(id) {
        try {
            const products = await this.readFile();
            const product = products.find((prod) => prod.id === id) || null;
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map