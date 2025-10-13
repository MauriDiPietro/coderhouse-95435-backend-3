import { NextFunction, Request, Response } from "express";
import ProductService, { productService } from "../services/product-service";

class ProductController {
  private service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.service.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.service.create(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.service.update(id, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const productController = new ProductController(productService);
