import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: { type: Number, default: 1 }
        }
    ],

    totalAmount: { type: Number, required: true },

    status: {
        type: String,
        enum: ["pending", "process", "shipped", "delivered", "cancel"],
        default: "pending"
    },

    paymentMethod: {
        type: String,
        enum: ["cod"],
        default: "cod"
    },

    trackingId: String,
    deliveryAddress: { type: String, enum: ["dhaka", "outside"],required: true },
    deliveryFee : {type: Number, required: true },
    deliveryStatus: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending"
    }

}, { timestamps: true, versionKey: false });

export default mongoose.model("Order", orderSchema);