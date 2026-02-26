import {AdminModel} from "../models/AdminModel.js";
import CategoryModel from "../models/CategoryModel.js";
import categoryModel from "../models/CategoryModel.js";
import mongoose from "mongoose";
import ProductModel from "../models/ProductModel.js";


export const createCategoryService = async (req) =>{
    try{
        const admin_id = req.headers.user_id
        console.log(admin_id)
        const {categoryName} = req.body;
        const existsAdmin = await AdminModel.findOne({_id: admin_id})
        const category = await CategoryModel.findOne({categoryName: categoryName})


        if(!existsAdmin){
            return {
                status : "failed",
                msg : "Admin not found"
            }
        }

        if(category){
            return {
                status : "failed",
                msg : "Category already exists"
            }
        }

        await CategoryModel.create({categoryName : categoryName,});
        return {
            status : "success",
            msg : "Category created"
        }

    }
    catch(error){
        return {
            status : "failed",
            msg : "Something went wrong",
            error : error.toString()
        };
    }
}

export const updateCategoryService = async (req) =>{
    try{
        const {categoryName} = req.body;
        const categoryID = req.params.id;

        const data = await CategoryModel.findOne({_id : categoryID});
        if(!data){
            return {
                status : "failed",
                msg : "Category not found"
            }
        }

        await categoryModel.updateOne({categoryName: categoryName})

        return {
            status : "success",
            msg : "Category updated"
        }

    }
    catch(error){
        return {
            status : "failed",
            msg : "Something went wrong",
            error : error.toString()
        }
    }
}

export const readCategoryService = async (req) =>{
    try{
        const data = await categoryModel.find();

        if(!data){
            return {
                status : "failed",
                msg : "Category not found"
            }
        }
        return {
            status : "success",
            msg : "Category Successfully",
            data : data
        }
    }
    catch(error){
        return {
            status : "failed",
            msg : "Something went wrong",
            error : error.toString()
        }
    }
}

export const DeleteCategoryService = async (req) =>{

    try{
        const categoryID = req.params.id;

        const data = await categoryModel.findOne({_id : categoryID});
        if(!data){
            return {
                status : "failed",
                msg : "Category not found"
            }
        }
        await categoryModel.deleteOne({_id : categoryID});
        await ProductModel.deleteMany({categoryID : categoryID});

        return {
            status: "success",
            msg: "Category and related products deleted successfully"
        };

    }
    catch(error){
        return {
            status : "failed",
            msg : "Something went wrong",
            error : error.toString()
        }
    }
}