import { getCustomRepository } from 'typeorm';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { apiInfo, getUrl } from '@config/api_info';

interface Request {
  userId?: string;
  singleStationId?: string;
}

interface urlArray {
  stationID: string;
  url: string;
}

export default async function handleStationsRequest({ userId, singleStationId }: Request): Promise<urlArray[]> {

  const urlArray: urlArray[] = [];

  if (!!userId) {
    // Grabing data for use page
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.checkUserExists({ userId });

    let userStations: string | string[] = '';

    if (!singleStationId) {
      userStations = user.stations;

      for (let i = 0; i < userStations.length; i++) {
        urlArray[i] = {
          stationID: userStations[i],
          url: getUrl(userStations[i])
        }
      }

    } else {
      userStations = user.stations[user.stations.length-1];

      urlArray[0] = {
        stationID: singleStationId,
        url: getUrl(singleStationId)
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