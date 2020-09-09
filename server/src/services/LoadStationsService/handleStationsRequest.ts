import { apiInfo, getUrl } from '../../utils/API_info';
import checkUserExists from '../../utils/checkUserExists';

interface Request {
  userRequest: boolean;
  userId?: string | undefined;
}

interface urlArray {
  stationID: string;
  url: string;
}

export default async function handleStationsRequest({ userRequest, userId }: Request): Promise<urlArray[]> {

  const urlArray: urlArray[] = [];
  
  // Grabing data for home page
  if (!userRequest) {

    for (let i=0; i<apiInfo.stationsId.length; i++) {
      urlArray[i] = {
        stationID: apiInfo.stationsId[i],
        url: getUrl(apiInfo.stationsId[i])
      }
    }
    
  } else {
    // Grabing data for use page
    const user = await checkUserExists({id: userId})

    const userStations = user.stations;
    // const userStationsNames = user.stations_names;

    for (let i=0; i<userStations.length; i++) {
      urlArray[i] = {
        stationID: userStations[i],
        url: getUrl(userStations[i])
      }
    }
  }

  return urlArray;
  }