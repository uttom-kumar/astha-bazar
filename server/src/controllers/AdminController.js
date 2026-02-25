import {
    adminCreateService,
    adminLoginService,
    adminLogoutService,
    verifyOtpService
} from "../services/AdminService.js";


export const adminRegister = async (req, res) => {
    let result = await  adminCreateService(req, res)
    return res.json(result)
}
export const adminLogin = async (req, res) => {
    let result = await adminLoginService(req, res)
    return res.json(result)
}

export const verifyOtp = async (req, res) => {
    let result = await verifyOtpService(req, res)
    return res.json(result)
}

export const adminLogOut = async (req, res) => {
    let result = await adminLogoutService (req, res)
    return res.json(result)
}


