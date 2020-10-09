import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

// Create new user
usersRouter.post('/', usersController.create);

// Verify authentication
usersRouter.use(ensureAuthenticated);

// Delete a user
usersRouter.delete('/', usersController.delete);

export default usersRouter;