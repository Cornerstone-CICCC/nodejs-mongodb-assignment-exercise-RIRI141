import { Router } from "express";
import productController from "../controllers/product.controller";

const productRouter = Router();

productRouter.get('/', productController.getAllProducts)
productRouter.get('/search', productController.getproductByName)
productRouter.post('/', productController.createProduct)
productRouter.put('/:id', productController.updateProduct)
productRouter.delete('/:id', productController.deleteProductById)

export default productRouter