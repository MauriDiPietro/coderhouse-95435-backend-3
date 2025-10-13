import ProductDao, { productDao } from "../daos/mongodb/product-dao";
import { ProductInput } from "../types/product-type";
import CustomError, { NotFound } from "../utils/custom-error";

export default class ProductService {
  private dao: ProductDao;
  constructor(dao: ProductDao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      const response = await this.dao.getAll();
      if (!response) throw new NotFound("No products found");
      return response;
    } catch (error) {
      throw error;
    }
  };

  getById = async (id: string | undefined) => {
    try {
      const response = await this.dao.getById(id);
      if (!response) throw new NotFound("Product not found");
      return response;
    } catch (error) {
      throw error;
    }
  };

  create = async (body: ProductInput) => {
    try {
      const response = await this.dao.create(body);
      if (!response) throw new CustomError("Error create product", 400);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string | undefined, body: ProductInput) => {
    try {
      const response = await this.dao.update(id, body);
      if (!response) throw new CustomError("Error update product", 400);
      return response;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string | undefined) => {
    try {
      const response = await this.dao.delete(id);
      if (!response) throw new CustomError("Error delete product", 400);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const productService = new ProductService(productDao);
