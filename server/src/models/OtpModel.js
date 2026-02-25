import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        otp: { type: String, required: true },
        expiresAt: { type: Date, required: true }
    },
    { timestamps: true, versionKey: false }
);

// TTL index (auto delete when expired)
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpModel = mongoose.model("otp", otpSchema);