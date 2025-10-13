import { Model } from "mongoose";
import { ProductModel } from "../../models/product-model";
import { ProductDB } from "../../types/product-type";
import MongoDao from "./mongo-dao";

export default class ProductDao extends MongoDao<ProductDB> {
  constructor(model: Model<ProductDB>) {
    super(model);
  }
}

export const productDao = new ProductDao(ProductModel);