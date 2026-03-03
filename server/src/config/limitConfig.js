import rateLimit from "express-rate-limit";

// Login limiter (very strict)
export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 5, // only 5 attempts
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: "failed",
        message: "Too many login attempts. Please try again after 15 minutes."
    }
});

// OTP limiter
export const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // 3 attempts only
    message: {
        status: "failed",
        message: "Too many OTP attempts. Try again later."
    }
});