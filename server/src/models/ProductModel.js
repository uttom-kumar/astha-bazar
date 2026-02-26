import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    name: { type: String, required: true , lowercase: true, trim: true },
    price: { type: Number, required: true },
    description: {type: String},
}, { timestamps: true, versionKey: false });

export default mongoose.model("products", productSchema);