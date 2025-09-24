import {Router} from 'express'
import { productController } from '../controllers/product-controller.js'

const router = Router()

/**
 * @swagger
 * /products:
 *  get:
 *   summary: Obtiene todos los productos
 *   tags: [Products]
 *   resposes:
 *      200:
 *       description: Lista de productos
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Products/ProductList'             
 */
router.route('/')
    .get(productController.getAll)
    .post(productController.create)

/**
 * @swagger
 * /products/{id}:
 *  get:
 */
router.route('/:id')
    .get(productController.getById)
    .put(productController.update)
    .delete(productController.delete)

export default router;