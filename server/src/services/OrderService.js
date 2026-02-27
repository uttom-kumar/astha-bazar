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


export const readOrderService = async () => {
    try {

        const data = await OrderModel.aggregate([

            //Unwind products array
            {
                $unwind: "$products"
            },

            //Lookup product details
            {
                $lookup: {
                    from: "products", // collection name
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },

            //Convert productDetails array to object
            {
                $unwind: "$productDetails"
            },

            //Optional clean response
            {
                $project: {
                    customerName: 1,
                    phone: 1,
                    address: 1,
                    status: 1,
                    deliveryArea: 1,
                    deliveryFee: 1,
                    totalAmount: 1,

                    quantity: "$products.quantity",

                    productName: "$productDetails.name",
                    productPrice: "$productDetails.price",
                    productDiscountPrice: "$productDetails.discountPrice"
                }
            }

        ]);

        if (data.length === 0) {
            return {
                status: "failed",
                msg: "No orders found"
            };
        }

        return {
            status: "success",
            msg: "Orders fetched successfully",
            data: data
        };

    } catch (error) {
        return {
            status: "failed",
            msg: "Something went wrong",
            error: error.message
        };
    }
};

export const readUserOrdersService = async (req) => {
    try {

        const { phone } = req.body;

        if (!phone) {
            return {
                status: "failed",
                msg: "Phone number is required"
            };
        }

        const data = await OrderModel.aggregate([

            // 1️⃣ Match user phone
            {
                $match: { phone: phone }
            },

            // 2️⃣ Unwind products array
            {
                $unwind: "$products"
            },

            // 3️⃣ Lookup product details
            {
                $lookup: {
                    from: "products",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },

            // 4️⃣ Convert array to object
            {
                $unwind: "$productDetails"
            },

            // 5️⃣ Clean response
            {
                $project: {
                    customerName: 1,
                    phone: 1,
                    address: 1,
                    status: 1,
                    deliveryArea: 1,
                    deliveryFee: 1,
                    totalAmount: 1,
                    createdAt: 1,

                    quantity: "$products.quantity",

                    productName: "$productDetails.name",
                    productPrice: "$productDetails.price",
                    productDiscountPrice: "$productDetails.discountPrice"
                }
            }

        ]);

        if (data.length === 0) {
            return {
                status: "failed",
                msg: "No orders found"
            };
        }

        return {
            status: "success",
            msg: "User orders fetched successfully",
            data
        };

    } catch (error) {
        return {
            status: "failed",
            msg: "Something went wrong",
            error: error.message
        };
    }
};