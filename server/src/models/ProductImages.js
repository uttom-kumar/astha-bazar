import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    images: [
        {
            type: String,
            required: true
        }
    ],
}, { timestamps: true, versionKey: false });

export default mongoose.model("productimages", productSchema);