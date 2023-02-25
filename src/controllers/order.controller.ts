import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderModel.createOrder(req.body);
        res.json({
            status: 'success',
            data: { ...order },
            message: 'The order created',
        });
    } catch (err) {
        next(err);
    }
};

const getAllOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await orderModel.getOrders();
        res.json({
            status: 'success',
            data: { ...orders },
            message: 'orders retrived ',
        });
    } catch (err) {
        next(err);
    }
};

const getoneOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderModel.getOneOrder(
            req.params.id as unknown as number
        );
        res.json({
            status: 'success',
            data: order,
            message: 'order retrived successfully',
        });
    } catch (err) {
        next(err);
    }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderModel.updateOrder(req.body);
        res.json({
            status: 'success',
            data: order,
            message: 'order updated',
        });
    } catch (err) {
        next(err);
    }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderModel.deleteOrder(
            req.params.id as unknown as number
        );
        res.json({
            status: 'success',
            data: order,
            message: 'order deleted',
        });
    } catch (err) {
        next(err);
    }
};

export { create, getAllOrders, getoneOrder, updateOrder, deleteOrder };
