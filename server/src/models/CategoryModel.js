import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true, lowercase: true, trim: true },
}, { timestamps: true , versionKey: false});

export default mongoose.model("Categories", categorySchema);