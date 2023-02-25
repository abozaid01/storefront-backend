import { Router } from 'express';
import * as controllers from '../../controllers/order.controller';
import validateMiddleware from '../../middleware/authenticate.middlware';

const routes = Router();
routes
    .route('/')
    .get(validateMiddleware, controllers.getAllOrders)
    .post(validateMiddleware, controllers.create);
routes
    .route('/:id')
    .get(validateMiddleware, controllers.getoneOrder)
    .put(validateMiddleware, controllers.updateOrder)
    .delete(validateMiddleware, controllers.deleteOrder);

export default routes;
