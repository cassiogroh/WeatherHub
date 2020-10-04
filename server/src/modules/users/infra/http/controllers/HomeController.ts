import { Request, Response} from 'express';

import LoadStationsService from '@modules/users/services/LoadStationsService/LoadStationsService';

export default class HomeController {
  public async index (request: Request, response: Response): Promise<Response> {
    const loadStationsService = new LoadStationsService();
    const loadedStations = await loadStationsService.execute({});
    return response.json(loadedStations);
  };
};