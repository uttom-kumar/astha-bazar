import {createOrderService, readOrderService, readUserOrdersService} from "../services/OrderService.js";

export const createOrder = async (req, res) => {
    let result = await createOrderService(req, res)
    return res.json(result)
}

export const readOrder = async (req, res) => {
    let result = await readOrderService(req, res)
    return res.json(result)
}
export const readUserOrders = async (req, res) => {
    let result = await readUserOrdersService(req, res)
    return res.json(result)
}