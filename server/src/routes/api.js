import express from 'express'
const router = express.Router()
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";

import * as adminController from "../controllers/AdminController.js";
import {sentOTP} from "../controllers/otpController.js";





// user API
router.post('/sentOtp', sentOTP)
router.post('/Register',adminController.adminRegister)
router.post('/Login',adminController.adminLogin)
router.get('verifyOtp', adminController.verifyOtp)
router.post('/LogOut',AuthMiddleware,adminController.adminLogOut)









export default router;