import populateStations from './populateStations';
import handleStationsRequest from './handleStationsRequest';

interface LoadStations {
  userRequest: boolean;
  userId?: string;
}

class LoadStationsService {

  public async execute({ userRequest, userId }: LoadStations) {

    const urlArray  = await handleStationsRequest({ userRequest, userId })
    
    const stationsArray = await populateStations({userRequest, urlArray, userId});

    return stationsArray;
  }
}

export default LoadStationsService;