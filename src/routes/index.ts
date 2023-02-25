import { Router } from 'express';
import userRoutes from './api/user.routes';
import productRoutes from './api/product.routes';
import orderRoutes from './api/order.routes';
import orderProductRoutes from './api/order-product.routes';
const routes = Router();

routes.use('/user', userRoutes);
routes.use('/product', productRoutes);
routes.use('/order', orderRoutes);
routes.use('/order-product', orderProductRoutes);

export default routes;
