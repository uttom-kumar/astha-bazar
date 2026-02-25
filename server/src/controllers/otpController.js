import {sentOTPService} from "../services/sentOTPService.js";

export const sentOTP = async (req, res) => {
    let result = await sentOTPService(req);
    return res.json(result);
}