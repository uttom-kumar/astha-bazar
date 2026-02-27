import express from "express";
const orderRoutes = express.Router();
import * as OrderController from "../controllers/OrderController.js";

orderRoutes.post("/createOrder", OrderController.createOrder )



export default orderRoutes;