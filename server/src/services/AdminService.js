import {AdminModel} from "../models/AdminModel.js";
import {EncodedToken} from "../utility/TokenUtility.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import {EmailSend} from "../utility/EmailUtility.js";
import {OtpModel} from "../models/OtpModel.js";



export const adminCreateService = async (req) => {
    try{
        let reqBody = req.body
        let user = await AdminModel.findOne({email : reqBody.email})

        if(user){
            return {
                status : "failed",
                msg : "Email already exists"
            }
        }

        if(reqBody.password.length < 8){
            return {
                status : "failed",
                msg : "Password must be at least 8 characters"
            }
        }

        // Hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(reqBody.password, salt);

        // Update the password in reqBody with the hashed one
        reqBody.password = hashPassword;
        reqBody.role = "admin";
       
        const data = await AdminModel.create(reqBody)
        return {
            status : "success",
            msg : "User registration successfully!",
            data: data
        }
      
    }
    catch (err) {
        return {
            status : "failed",
            msg : "some thing went wrong" ,
            error : err.toString()
        }
    }
}

export const adminLoginService = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await AdminModel.findOne({ email });
        if (!user) {
            return {
                status: "failed",
                msg: "User not found",
            };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                status: "failed",
                msg: "Incorrect password",
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
            msg: "OTP sent to email",
        };

    } catch (err) {
        return {
            status: "failed",
            msg: "Login failed",
            error: err.message
        };
    }
};

export const verifyOtpService = async (req, res) => {
    try {
        let { email, otp } = req.body;

        let otpData = await OtpModel.findOne({ email });

        if(!otpData){
            return {
                status: "failed",
                msg: "OTP expired or not found",
            };
        }

        const otpMatch = await bcrypt.compare(otp, otpData.otp);
        if (!otpMatch) {
            return {
                status: "failed",
                msg: "Invalid OTP",
            };
        }

        // OTP correct → delete it
        await OtpModel.deleteOne({ email });

        let user = await AdminModel.findOne({ email });

        let token = EncodedToken(user.email, user._id);

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",
            secure: true
        });

        return {
            status: "success",
            msg: "Login Successfully",
        };

    } catch (err) {
        return{
            status: "failed",
            msg: "OTP verification failed",
            error: err.message
        };
    }
};

export const adminLogoutService = async (req, res) => {
    try{
        res.clearCookie("token")
        return {
            status : "success",
            msg : "Logged Out Successfully",
        }
    }
    catch (err){
        return {
            status : "failed",
            msg : "Failed to Logout",
            error : err.toString()
        }
    }
}


export const readProfileService = async (req, res) => {
    try{
        const adminID = req.headers.user_id;
        const existAdmin = await AdminModel.findOne({ _id: adminID });

        if(!existAdmin){
            return {
                status : "failed",
                msg : "User not found",
            }
        }

        return {
            status : "success",
            msg : "Profile successfully",
            data : existAdmin
        }


    }
    catch (error) {
        return {
            status : "failed",
            msg : "Something went wrong",
            error : error.toString()
        }
    }
}





