import ProductModel from "../models/ProductModel.js";



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
