import populateStations from './populateStations';
import handleStationsRequest from './handleStationsRequest';

interface Request {
  userId?: string;
  singleStationId?: string;
}

class LoadStationsService {

  public async execute({ userId, singleStationId }: Request) {

    const urlArray = await handleStationsRequest({ userId, singleStationId })

    const stationsArray = await populateStations({ urlArray, userId });

    return stationsArray;
  }
}

export default LoadStationsService;