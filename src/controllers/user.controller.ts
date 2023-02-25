import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
import config from '../middleware/config';
import jwt from 'jsonwebtoken';

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
        const user = await userModel.getOne(req.params.id as unknown as number);
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

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.auth(email, password);
        const token = jwt.sign(
            { user },
            config.tokenSecret as unknown as string
        );
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message:
                    'sorry, username or password is not correct. please try again',
            });
        }
        return res.json({
            status: 'success',
            data: { ...user, token },
            message: 'user authenticated successfully',
        });
    } catch (err) {
        return next(err);
    }
};

export { create, getAll, getUser, update, deleteUser, auth };
