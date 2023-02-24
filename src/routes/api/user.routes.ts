import { Router } from 'express';
import * as userController from '../../controllers/user.controller';
import validateMiddleware from '../../middleware/authenticate.middlware';
const routes = Router();

routes
    .route('/')
    .get(validateMiddleware, userController.getAll)
    .post(userController.create);
routes
    .route('/:id')
    .get(validateMiddleware, userController.getUser)
    .patch(validateMiddleware, userController.update)
    .delete(validateMiddleware, userController.deleteUser);

//authentication
routes.route('/auth').post(userController.auth);

export default routes;
