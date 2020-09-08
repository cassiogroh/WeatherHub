import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const registerRouter = Router();

registerRouter.get('/', async (request, response) => {
  // const loadStationsService = new CreateUserService();
  // const loadedStations = await loadStationsService.execute()
  // return response.json(loadedStations);
})
  
export default registerRouter;