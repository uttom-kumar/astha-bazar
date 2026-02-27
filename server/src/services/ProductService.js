import ProductModel from "../models/ProductModel.js";
import mongoose from "mongoose";
import ProductImages from "../models/ProductImages.js";
const ObjectId = mongoose.Types.ObjectId;
import cloudinary from "../utility/cloudinaryConfig.js";

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
    try {
        const productID =req.params.id;

        //Check & delete product
        const productData = await ProductModel.deleteOne({ _id: productID });
        if (productData.deletedCount === 0) {
            return { status: "failed", msg: "Product not found" };
        }

        //Get all images for this product
        const images = await ProductImages.find({ productID });

        //Collect all public_ids
        const publicIds = [];
        for (let imgDoc of images) {
            for (let key in imgDoc) {
                if (key.startsWith("img") && imgDoc[key]?.public_id) {
                    publicIds.push(imgDoc[key].public_id);
                }
            }
        }

        //Delete images from Cloudinary (parallel)
        await Promise.all(publicIds.map(id => cloudinary.uploader.destroy(id)));

        // Delete image documents from MongoDB
        await ProductImages.deleteMany({ productID });

        return {
            status: "success",
            msg: "Product and images deleted successfully",
        };

    } catch (error) {
        return {
            status: "failed",
            msg: "Something went wrong",
            error: error.toString(),
        };
    }
};

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

export const createProductImageService = async (req) => {
    try {
        const productID = req.params.id;

        const findProduct = await ProductModel.findOne({_id: productID});
        if (!findProduct) {
            return {status : "failed", msg : "Product not found"};
        }

        if (!req.files || !req.files.images) {
            return { status: "failed", msg: "No images uploaded" };
        }

        let images = req.files.images;
        if (!Array.isArray(images)) images = [images];

        const imageData = [];

        for (const file of images) {
            const result = await cloudinary.uploader.upload(file.tempFilePath, { folder: "products" });
            imageData.push({ url: result.secure_url, public_id: result.public_id });
        }

        const productImages = await ProductImages.create({
            productID,
            img1: imageData[0] || null,
            img2: imageData[1] || null,
            img3: imageData[2] || null,
            img4: imageData[3] || null,
        });

        return { status: "success", msg: "Images uploaded to Cloudinary", data: productImages };

    } catch (error) {
        return { status: "failed", msg: "Something went wrong", error: error.message };
    }
};

export const updateProductImagesService = async (req) => {
    try {
        const productID = req.params.id;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(productID)) {
            return { status: "failed", msg: "Invalid product ID" };
        }

        // Find existing product images
        const existingImages = await ProductImages.findOne({ productID });
        if (!existingImages) {
            return { status: "failed", msg: "Product images not found" };
        }

        // Check if any images are uploaded
        if (!req.files || Object.keys(req.files).length === 0) {
            return { status: "failed", msg: "No new images uploaded" };
        }

        // Allowed slots
        const slots = ["img1", "img2", "img3", "img4"];

        // Loop through each slot and update if a file is uploaded
        for (let slot of slots) {
            if (req.files[slot]) {
                const file = req.files[slot];

                // Delete old image from Cloudinary if exists
                if (existingImages[slot]?.public_id) {
                    await cloudinary.uploader.destroy(existingImages[slot].public_id);
                }

                // Upload new image to Cloudinary
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "products",
                });

                // Save new url and public_id
                existingImages[slot] = { url: result.secure_url, public_id: result.public_id };
            }
        }

        // Save updated images
        const updatedImages = await existingImages.save();

        return {
            status: "success",
            msg: "Product images updated successfully",
            data: updatedImages,
        };

    } catch (error) {
        return {
            status: "failed",
            msg: "Something went wrong",
            error: error.message,
        };
    }
};