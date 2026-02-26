import {CreateProductService} from "../services/ProductService.js";


export const createProduct = async (req, res) => {
    let result = await CreateProductService(req);
    return res.json(result);
}

export const updateProduct = async (req, res) => {
    let result = await CreateProductService(req);
    return res.json(result);
}

export const deleteProduct = async (req, res) => {
    let result = await CreateProductService(req);
    return res.json(result);
}

export const readProducts = async (req, res) => {
    let result = await CreateProductImageService(req);
    return res.json(result);
}

export const readSingleProduct = async (req, res) => {
    let result = await CreateProductService(req);
    return res.json(result);
}

