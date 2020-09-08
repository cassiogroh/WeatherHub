import { Router } from 'express';

import homeRouter from './home.routes';
import UserRouter from './user.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/users', UserRouter);
routes.use('/sessions', sessionsRouter)

export default routes;