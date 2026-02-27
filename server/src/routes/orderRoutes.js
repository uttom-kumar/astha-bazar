import express from "express";
const orderRoutes = express.Router();
import * as OrderController from "../controllers/OrderController.js";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";

orderRoutes.post("/createOrder", OrderController.createOrder )
orderRoutes.get("/readOrder", AuthMiddleware,OrderController.readOrder )
orderRoutes.get("/readUserOrders",OrderController.readUserOrders )



export default orderRoutes;