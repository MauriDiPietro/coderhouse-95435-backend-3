import { Document, Model } from "mongoose";
import { ProductDB, ProductInput } from "../../types/product-type";
import { UserDB, UserInput } from "../../types/user-type";

export default class MongoDao<T extends Document> {
  protected model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  getAll = async (): Promise<ProductDB | UserDB[]> => {
    try {
      return await this.model.find();
    } catch (error) {
      throw error;
    }
  };

  getById = async (id: string | undefined): Promise<ProductDB | UserDB | null> => {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw error;
    }
  };

  create = async (
    body: ProductInput | UserInput
  ): Promise<ProductDB | UserDB | T> => {
    try {
      return await this.model.create(body);
    } catch (error) {
      throw error;
    }
  };

  update = async (
    id: string | undefined,
    body: ProductInput | UserInput
  ): Promise<ProductDB | UserDB | null> => {
    try {
      return await this.model.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string | undefined): Promise<ProductDB | UserDB | null> => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  };
}
