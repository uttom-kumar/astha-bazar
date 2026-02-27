import {createOrderService} from "../services/OrderService.js";

export const createOrder = async (req, res) => {
    let result = await createOrderService(req, res)
    return res.json(result)
}