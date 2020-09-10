import populateStations from './populateStations';
import handleStationsRequest from './handleStationsRequest';

interface Request {
  userId?: string;
}

class LoadStationsService {

  public async execute({ userId }: Request) {

    const urlArray = await handleStationsRequest({ userId })

    const stationsArray = await populateStations({ urlArray, userId });

    return stationsArray;
  }
}

export default LoadStationsService;