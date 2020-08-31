import { Router } from 'express';

import LoadStationsService from '../services/LoadStationsService';
import apiInfo from '../services/API_info/API_info';

const homeRouter = Router();

homeRouter.get('/', async (request, response) => {

  const loadStationsService = new LoadStationsService();

  const loadedStations = await loadStationsService.execute()

  return response.json(loadedStations);
})
  

export default homeRouter;