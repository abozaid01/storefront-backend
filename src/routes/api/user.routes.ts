import { Router } from 'express';
import * as userController from '../../controllers/user.controller';

const routes = Router();

routes.route('/').get(userController.getAll).post(userController.create);
routes
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.update)
    .delete(userController.deleteUser);

export default routes;
