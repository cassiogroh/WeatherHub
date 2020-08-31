import { Router } from 'express';

import homeRouter from './home.routers';
import registerRouter from './register.router';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/register', registerRouter);

export default routes;