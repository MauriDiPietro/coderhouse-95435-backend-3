import { Router } from "express";
import { productController } from "../controllers/product-controller";
import {
  validateBody,
  validateParams,
} from "../middlewares/validators/product-validator";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", [validateParams], productController.getById);
router.post("/", [validateBody], productController.create);
router.put("/:id", [validateParams, validateBody], productController.update);
router.delete("/:id", [validateParams], productController.delete);

export default router;
