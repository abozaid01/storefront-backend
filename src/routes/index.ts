import { Router } from 'express';
import userRoutes from './api/user.routes';
import productRoutes from './api/product.routes';
const routes = Router();

routes.use('/user', userRoutes);
routes.use('/product', productRoutes);

export default routes;
