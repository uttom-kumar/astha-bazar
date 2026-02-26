import express from 'express'
const adminRouter = express.Router()
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";

import * as adminController from "../controllers/AdminController.js";
import router from "./api.js";

adminRouter.post('/Register',adminController.adminRegister)
adminRouter.post('/Login',adminController.adminLogin)
adminRouter.post('/verifyOtp', adminController.verifyOtp)
adminRouter.get('/LogOut',AuthMiddleware,adminController.adminLogOut)
adminRouter.get('/readProfile', AuthMiddleware, adminController.readProfile)

export default adminRouter;