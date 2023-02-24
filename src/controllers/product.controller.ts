import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/product.model';

const productModel = new ProductModel();

const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.createProduct(req.body);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'The product created',
        });
    } catch (err) {
        next(err);
    }
};

const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await productModel.getProducts();
        res.json({
            status: 'success',
            data: { ...products },
            message: 'products retrived ',
        });
    } catch (err) {
        next(err);
    }
};

const getoneProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.getOneProduct(
            req.params.id as unknown as number
        );
        res.json({
            status: 'success',
            data: product,
            message: 'product retrived successfully',
        });
    } catch (err) {
        next(err);
    }
};

const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.updateProduct(req.body);
        res.json({
            status: 'success',
            data: product,
            message: 'Product updated',
        });
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.deleteProduct(
            req.params.id as unknown as number
        );
        res.json({
            status: 'success',
            data: product,
            message: 'product deleted',
        });
    } catch (err) {
        next(err);
    }
};

export {
    createProduct,
    getAllProducts,
    getoneProduct,
    updateProduct,
    deleteProduct,
};
