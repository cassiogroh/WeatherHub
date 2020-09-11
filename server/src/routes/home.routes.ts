import { Router } from 'express';

import LoadStationsService from '../services/LoadStationsService/LoadStationsService';

const homeRouter = Router();

homeRouter.get('/', async (request, response) => {
  const loadStationsService = new LoadStationsService();
  const userId = '2b5936c4-8a21-47a5-9807-b4ec7ec228a9';
  const loadedStations = await loadStationsService.execute({ userId });
  return response.json(loadedStations);
})

export default homeRouter;