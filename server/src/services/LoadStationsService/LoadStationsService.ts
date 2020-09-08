import populateStations from './populateStations';
import handleStationsRequest from './handleStationsRequest';

interface LoadStations {
  userRequest: boolean;
  userId?: string;
}

interface urlArray {
  stationID: string;
  url: string;
}

class LoadStationsService {

  public async execute({ userRequest, userId }: LoadStations) {

    const urlArray  = await handleStationsRequest({ userRequest, userId })
    
    const stationsArray = populateStations(urlArray);

    return stationsArray;
  }
}

export default LoadStationsService;