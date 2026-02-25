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
                message : "Email already exists"
            }
        }

        if(reqBody.password.length < 8){
            return {
                status : "failed",
                message : "Password must be at least 8 characters"
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
            message : "User registration successfully!",
            data: data
        }
      
    }
    catch (err) {
        return {
            status : "failed",
            message : "some thing went wrong" ,
            error : err.toString()
        }
    }
}

export const adminLoginService = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await AdminModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: "failed",
                message: "Incorrect password",
            });
        }

        // Generate 6 digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP in DB
        await OtpModel.findOneAndUpdate(
            { email },
            { email: email, otp: otpCode },
            { upsert: true, new: true }
        );

        return res.status(200).json({
            status: "success",
            message: "OTP sent to email",
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Login failed",
            error: err.message
        });
    }
};

export const verifyOtpService = async (req, res) => {
    try {
        let { email, otp } = req.body;

        let otpData = await OtpModel.findOne({ email });

        if (!otpData || otpData.otp !== otp) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid OTP",
            });
        }

        // OTP correct → delete it
        await OtpModel.deleteOne({ email });

        let user = await AdminModel.findOne({ email });

        let token = EncodedToken(user.email, user._id);

        let options = {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",
            secure: true,
        };

        res.cookie("token", token, options);

        return res.status(200).json({
            status: "success",
            message: "Login Successfully",
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "OTP verification failed",
            error: err.message
        });
    }
};

export const adminLogoutService = async (req, res) => {
    try{
        res.clearCookie("token")
        return {
            status : "success",
            message : "Logged Out Successfully",
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Failed to Logout",
            error : err.toString()
        }
    }
}





