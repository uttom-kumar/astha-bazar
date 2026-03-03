import express from 'express'
const adminRouter = express.Router()
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";

import * as adminController from "../controllers/AdminController.js";

import {loginLimiter, otpLimiter} from "../config/limitConfig.js";

adminRouter.post('/Register',loginLimiter, adminController.adminRegister)
adminRouter.post('/Login',loginLimiter, adminController.adminLogin)
adminRouter.post('/verifyOtp', otpLimiter, adminController.verifyOtp)
adminRouter.get('/LogOut',AuthMiddleware,adminController.adminLogOut)
adminRouter.get('/readProfile', AuthMiddleware, adminController.readProfile)

export default adminRouter;
