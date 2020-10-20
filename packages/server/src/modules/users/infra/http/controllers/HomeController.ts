import { Request, Response} from 'express';

import GetForecastService from '@modules/users/services/GetForecastService';
import { container } from 'tsyringe';

export default class HomeController {
  
  public async show (request: Request, response: Response): Promise<Response> {
    const { latitude, longitude } = request.headers;

    const getForecast = container.resolve(GetForecastService);

    const { forecastToday, daylyForecast } = await getForecast.execute({ latitude, longitude });

    return response.json([ forecastToday, daylyForecast ]);
  };
};