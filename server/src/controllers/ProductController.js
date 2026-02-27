import {
    CreateProductService,
    readProductService,
    updateProductService,
    deleteProductService,
    readSingleProductService, createProductImageService, updateProductImagesService
} from "../services/ProductService.js";


export const createProduct = async (req, res) => {
    let result = await CreateProductService(req);
    return res.json(result);
}

export const updateProduct = async (req, res) => {
    let result = await updateProductService(req);
    return res.json(result);
}

export const deleteProduct = async (req, res) => {
    let result = await deleteProductService(req);
    return res.json(result);
}

export const readProducts = async (req, res) => {
    let result = await readProductService(req);
    return res.json(result);
}

export const readSingleProduct = async (req, res) => {
    let result = await readSingleProductService(req);
    return res.json(result);
}


export const createProductImage = async (req, res) => {
    let result = await createProductImageService(req);
    return res.json(result);
}



export const updateProductImages = async (req, res) => {
    let result = await updateProductImagesService(req);
    return res.json(result);
}

