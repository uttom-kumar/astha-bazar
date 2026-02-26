import {createCategoryService, updateCategoryService, readCategoryService , DeleteCategoryService} from "../services/CategoryService.js";

export const createCategory = async (req, res) => {
    let result = await createCategoryService(req);
    return res.json(result);
}

export const updateCategory = async (req, res) => {
    let result = await updateCategoryService(req);
    return res.json(result);
}
export const readCategory = async (req, res) => {
    let result = await readCategoryService(req);
    return res.json(result);
}
export const deleteCategory = async (req, res) => {
    let result = await DeleteCategoryService(req);
    return res.json(result);
}