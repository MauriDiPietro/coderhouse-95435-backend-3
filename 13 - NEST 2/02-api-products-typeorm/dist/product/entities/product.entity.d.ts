import { ObjectId } from 'typeorm';
export declare class Product {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    stock: number;
}
