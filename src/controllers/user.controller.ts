import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //validate data

        //create the user
        const user = await userModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'user created successfully',
        });
    } catch (error) {
        next(error);
    }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModel.getAll();
        res.json({
            status: 'success',
            data: { ...users },
            message: 'User retrived ',
        });
    } catch (err) {
        next(err);
    }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //get specific user
        const user = await userModel.getOne(req.params.id as unknown as string);
        res.json({
            status: 'success',
            data: user,
            message: 'User retrived successfully',
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //validate data first

        //update user
        const user = await userModel.updateUser(req.body);
        res.json({
            status: 'success',
            data: user,
            message: 'User updated',
        });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.deleteUser(
            req.params.id as unknown as number
        );
        res.json({
            status: 'success',
            data: user,
            message: 'User deleted',
        });
    } catch (err) {
        next(err);
    }
};

export { create, getAll, getUser, update, deleteUser };
