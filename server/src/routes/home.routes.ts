import { Router } from 'express';

import LoadStationsService from '../services/LoadStationsService/LoadStationsService';

const homeRouter = Router();

homeRouter.get('/', async (request, response) => {
  const loadStationsService = new LoadStationsService();
  const loadedStations = await loadStationsService.execute({});
  return response.json(loadedStations);
})

export default homeRouter;