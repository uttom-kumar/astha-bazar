import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    img1:  { url: String, public_id: String },
    img2:  { url: String, public_id: String },
    img3:  { url: String, public_id: String },
    img4:  { url: String, public_id: String },
}, { timestamps: true, versionKey: false });

export default mongoose.model("productimages", productSchema);