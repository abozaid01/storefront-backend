import { Router } from 'express';
import * as controllers from '../../controllers/order-product.controller';
import validateMiddleware from '../../middleware/authenticate.middlware';

const routes = Router();
routes
    .route('/orders/:id/product')
    .post(validateMiddleware, controllers.create);
routes
    .route('/:id/product/:id')
    .get(controllers.show)
    .patch(validateMiddleware, controllers.updateOrder)
    .delete(validateMiddleware, controllers.deleteOrder);
routes.route('/:id/product').get(controllers.getoneOrder);

export default routes;
