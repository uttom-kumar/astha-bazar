import express from 'express'
const router = express.Router()
import productRoutes from "./productRoutes.js";
import adminRouter from "./adminRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import orderRoutes from "./orderRoutes.js";





// admin routes
router.use("/admin", adminRouter)

// category routes
router.use("/categories", categoryRoutes)

// product routes
router.use("/products", productRoutes)

// order routes
router.use("/order", orderRoutes)








export default router;