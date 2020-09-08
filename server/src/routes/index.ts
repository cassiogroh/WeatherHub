import { Router } from 'express';

import homeRouter from './home.router';
import UserRouter from './user.router';
import sessionsRouter from './sessions.router';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/users', UserRouter);
routes.use('/sessions', sessionsRouter)

export default routes;