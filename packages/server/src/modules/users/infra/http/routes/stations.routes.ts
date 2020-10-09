import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import StationsController from '../controllers/StationsController';

const stationsRouter = Router();
const stationsController = new StationsController();

// Verify authentication
stationsRouter.use(ensureAuthenticated);

// Load stations
stationsRouter.get('/', stationsController.index);

// Add a station
stationsRouter.post('/', stationsController.create);

// Remove a station
stationsRouter.delete('/', stationsController.delete);

// Rename a station
stationsRouter.put('/', stationsController.update);

export default stationsRouter;