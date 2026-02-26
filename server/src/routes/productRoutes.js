import express from 'express'
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import * as productController from "../controllers/ProductController.js";
const productRoutes = express.Router()


productRoutes.post("/createProduct",  AuthMiddleware, productController.createProduct)
productRoutes.put("/updateProduct/:id", AuthMiddleware, productController.updateProduct)
productRoutes.delete("/deleteProduct/:id", AuthMiddleware, productController.deleteProduct)
productRoutes.get("/", productController.readProducts)
productRoutes.get("/:id", productController.readSingleProduct)



export default productRoutes;