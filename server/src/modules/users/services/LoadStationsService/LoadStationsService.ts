import { container } from 'tsyringe';

import HandleStationsRequest from './HandleStationsRequest';
import PopulateStations from './PopulateStations';

interface Request {
  userId?: string;
  singleStationId?: string;
}

export default class LoadStationsService {
  public async execute({ userId, singleStationId }: Request) {
    const handleStationsRequest = container.resolve(HandleStationsRequest);
    const populateStations = container.resolve(PopulateStations);

    const urlArray = await handleStationsRequest.execute({ userId, singleStationId });
    const stationsArray = await populateStations.execute({ urlArray, userId });

    return stationsArray;
  }
}
