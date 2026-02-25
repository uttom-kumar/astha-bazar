import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: {type: String},
    imageUrl: {type : String},
}, { timestamps: true, versionKey: false });

export default mongoose.model("products", productSchema);