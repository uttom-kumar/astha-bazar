import express from "express";
const categoryRoutes = express.Router();



import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import * as categoryController from "../controllers/CategoryController.js";


categoryRoutes.post("/createCategories", AuthMiddleware, categoryController.createCategory );
categoryRoutes.put("/updateCategories/:id", AuthMiddleware, categoryController.updateCategory );
categoryRoutes.get("/", categoryController.readCategory );
categoryRoutes.delete("/deleteCategories/:id", AuthMiddleware, categoryController.deleteCategory );


export default categoryRoutes;