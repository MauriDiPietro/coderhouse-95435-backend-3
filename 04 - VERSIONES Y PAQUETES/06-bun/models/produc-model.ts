import { model, Schema, Document } from 'mongoose'

interface Product extends Document {
    name: string;
    price: number;
    description: string;
    stock: number;
}


const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const ProductModel = model<Product>("Products", ProductSchema);