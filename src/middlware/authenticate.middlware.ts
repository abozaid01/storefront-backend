import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/error.interface';
import config from './config';
import jwt from 'jsonwebtoken';

const handle = (next: NextFunction) => {
    const err: Error = new Error(`logain faild : try again later`) as Error;
    err.status = 401;
    next(err);
};
const validateMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        //get auth header
        const authHeader = req.get('Authorization');

        //check auth validate
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();

            //get value of token
            const token = authHeader.split(' ')[1];

            //check if it bearer token or not
            if (token && bearer === 'bearer') {
                const decode = jwt.verify(
                    token,
                    config.tokenSecret as unknown as string
                );
                if (decode) {
                    next();
                } else {
                    // Failed to authenticate user.
                    handle(next);
                }
            } else {
                // token type not bearer
                handle(next);
            }
        } else {
            // No Token Provided.
            handle(next);
        }
    } catch (err) {
        handle(next);
    }
};

export default validateMiddleware;
