import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true, versionKey: false });

export const AdminModel = mongoose.model('users', DataSchema);
