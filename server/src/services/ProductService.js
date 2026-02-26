import ProductModel from "../models/ProductModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const CreateProductService = async (req) => {
    try {
        const { categoryID, name, price, description } = req.body;

        if (!categoryID || !name || !price || !description) {
            return{
                status : "failed",
                msg : "All fields are required"
            }
        }

        // Database Save
        const newProduct = await ProductModel.create({
            categoryID,
            name,
            price,
            description,
        });

        return {
            status: "success",
            msg: "Product created successfully",
            data: newProduct };

    } catch (error) {
        return { status: "failed", msg: error.message };
    }
};


export const updateProductService = async (req) => {
    try{
        const productID = req.params.id;
        const reqBody = req.body;

        const data = await ProductModel.findOne({_id: productID})

        if(!data){
            return {status : "failed", msg : "Product not found"};
        }

        await ProductModel.updateOne(reqBody);
        return {
            status: "success",
            msg: "Product updated successfully",
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

export const readProductService = async (req) => {
    try{
        const data = await ProductModel.find();
        if(!data){
            return {status : "failed", msg : "Product not found"};
        }
        return {
            status: "success",
            msg: "Product read successfully",
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

export const deleteProductService = async (req) => {
    try{
        const productID = req.params.id;

        const data = await ProductModel.deleteOne({_id: productID});

        if (data.deletedCount === 0) {
            return { status: "failed", msg: "Product not found" };
        }

        return {
            status : "success",
            msg : "Product deleted successfully"
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

export const readSingleProductService = async (req) => {
    try{
        const productID = new ObjectId(req.params.id);

        const data = await ProductModel.aggregate([
            {
                $match : {
                    _id: productID
                }
            },
            {
                $lookup : {
                    from : "categories",
                    localField : "categoryID",
                    foreignField : "_id",
                    as : "category",
                }
            },
            { $unwind: "$category" },
            {
                $lookup : {
                    from : "productimages",
                    localField : "_id",
                    foreignField : "productID",
                    as : "productImage",
                }
            },
            {
                $project : {
                    createdAt : 0,
                    updatedAt : 0,
                    "category.createdAt": 0,
                    "category.updatedAt" : 0,
                    "productImage.createdAt" : 0,
                    "productImage.updatedAt" : 0,
                }
            }
        ])

        return {
            status: "success",
            msg: "Product read successfully",
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