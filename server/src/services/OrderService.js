import mongoose from "mongoose";
import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";

export const createOrderService = async (req) => {
    try {
        const { customerName, phone, address, products, deliveryArea } = req.body;

        //Basic validation
        if (!customerName || !phone || !address || !products || products.length === 0 || !deliveryArea) {
            return {
                status: "failed",
                msg: "All fields are required"
            };
        }

        let totalAmount = 0;
        let orderProducts = [];

        //Loop ordered products
        for (let item of products) {

            if (!mongoose.Types.ObjectId.isValid(item.productId)) {
                return {
                    status: "failed",
                    msg: "Invalid product ID"
                };
            }

            const product = await ProductModel.findById(item.productId);

            if (!product) {
                return {
                    status: "failed",
                    msg: "Product not found"
                };
            }

            const quantity = item.quantity || 1;

            //Discount logic
            const finalPrice =
                product.discountPrice && product.discountPrice > 0
                    ? product.discountPrice
                    : product.price;

            totalAmount += finalPrice * quantity;

            orderProducts.push({
                productId: product._id,
                quantity,
                priceAtPurchase: finalPrice
            });
        }

        //Delivery fee calculate
        let deliveryFee = 0;

        if (deliveryArea === "dhaka") {
            deliveryFee = 60;
        } else if (deliveryArea === "outside") {
            deliveryFee = 120;
        } else {
            return {
                status: "failed",
                msg: "Invalid delivery area"
            };
        }

        totalAmount += deliveryFee;

        // Create Order
        const order = await OrderModel.create({
            customerName,
            phone,
            address,
            products: orderProducts,
            totalAmount,
            deliveryArea,
            deliveryFee
        });

        return {
            status: "success",
            msg: "Order created successfully",
            data: order
        };

    } catch (error) {
        return {
            status: "failed",
            msg: "Failed to create order",
            error: error.message
        };
    }
};


export const orderListService = async () => {
    try {
        const data = await OrderModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "products.productID",
                    foreignField: "_id",
                    as: "product",
                }
            },
            {$unwind: "products"},
        ])

        if (!data) {
            return {
                status : "failed",
                msg : "Data not found"
            }
        }

        return {
            status: 'success',
            msg: 'Successfully updated product',
            data : data
        }
    }
    catch (error) {
        return{
            status : "failed",
            msg : "Something went wrong",
            error : error.toString()
        }
    }
}