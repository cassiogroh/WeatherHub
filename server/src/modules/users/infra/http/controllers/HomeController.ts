import { Request, Response} from 'express';
import { container } from 'tsyringe';

import LoadStationsService from '@modules/users/services/LoadStationsService/LoadStationsService';

export default class HomeController {
  
  public async index (request: Request, response: Response): Promise<Response> {
    const loadStationsService = container.resolve(LoadStationsService);
    
    const loadedStations = await loadStationsService.execute({});
    return response.json(loadedStations);
  };
};