import { Router } from 'express';

import homeRouter from './home.router';
import registerRouter from './register.router';
import deleteUserRouter from './delete.user.router';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/register', registerRouter);
routes.use('/delete_user', deleteUserRouter);

export default routes;