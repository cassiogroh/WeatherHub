import { Router } from 'express';

import homeRouter from '@modules/users/infra/http/routes/home.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import stationsRouter from '@modules/users/infra/http/routes/stations.routes';
import sessionsRouter from '@modules/users/infra/http//routes/sessions.routes';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/users', usersRouter);
routes.use('/users/stations', stationsRouter);
routes.use('/sessions', sessionsRouter)

export default routes;