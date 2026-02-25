import bcrypt from 'bcryptjs';
import { AdminModel } from "../models/AdminModel.js";
import { OtpModel } from "../models/OtpModel.js";
import {EmailSend} from "../utility/EmailUtility.js";


export const sentOTPService = async (req) => {
    try {
        const { email } = req;

        // Check admin exists
        const isEmailExists = await AdminModel.findOne({ email });

        if (!isEmailExists) {
            return {
                status: "failed",
                msg: "Email not found"
            };
        }

        // Generate 6 digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const EmailTo = email;
        const EmailText = `${otpCode}`;
        const EmailSubject = `Email Verification Code`;

        await EmailSend(EmailTo, EmailText, EmailSubject);

        // 5 minutes expiry
        const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

        // Hash OTP
        const salt = await bcrypt.genSalt(10);
        const hashOTP = await bcrypt.hash(otpCode, salt);

        // Save or Update OTP
        await OtpModel.findOneAndUpdate(
            { email },
            {
                email,
                otp: hashOTP,
                expiresAt: expiryTime
            },
            { upsert: true, new: true }
        );

        return {
            status: "success",
            msg: "OTP sent successfully",
            otp: otpCode // ⚠ remove this in production
        };

    } catch (error) {
        return {
            status: "failed",
            msg: "Something went wrong",
            error: error.toString()
        };
    }
};