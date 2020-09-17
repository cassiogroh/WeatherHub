import { getCustomRepository } from 'typeorm';

import UsersRepository from '../../repositories/UsersRepository';
import { apiInfo, getUrl } from '../../utils/API_info';

interface Request {
  userId?: string;
}

interface urlArray {
  stationID: string;
  url: string;
}

export default async function handleStationsRequest({ userId }: Request): Promise<urlArray[]> {

  const urlArray: urlArray[] = [];
  
  if (!!userId) {
    // Grabing data for use page
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.checkUserExists({ userId });

    const userStations = user.stations;

    for (let i = 0; i < userStations.length; i++) {
      urlArray[i] = {
        stationID: userStations[i],
        url: getUrl(userStations[i])
      }
    }
  } else {
    // Grabing data for home page
    for (let i = 0; i < apiInfo.stationsId.length; i++) {
      urlArray[i] = {
        stationID: apiInfo.stationsId[i],
        url: getUrl(apiInfo.stationsId[i])
      }
    }
  }

  return urlArray;
}