import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { apiInfo, getCurrentConditionsUrl, getHistoricUrl } from '@config/api_info';

interface Request {
  userId?: string;
  singleStationId?: string;
}

interface urlArray {
  stationID: string;
  urlCurrent: string;
  urlHistoric: string;
}

@injectable()
export default class HandleStationsRequest {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {};

  public async execute({ userId, singleStationId}: Request): Promise<urlArray[]> {
    const urlArray: urlArray[] = [];

    if (!!userId) {
      // Grabing data for user page

      const user = await this.usersRepository.checkUserExists(userId);

      let userStations: string | string[];

      if (!singleStationId) {
        userStations = user.stations;

        for (let i = 0; i < userStations.length; i++) {
          urlArray[i] = {
            stationID: userStations[i],
            urlCurrent: getCurrentConditionsUrl(userStations[i]),
            urlHistoric: getHistoricUrl(userStations[i])
          }
        }

      } else { // used when adding a station to dashboard
        userStations = user.stations[user.stations.length-1];

        urlArray[0] = {
          stationID: singleStationId,
          urlCurrent: getCurrentConditionsUrl(singleStationId),
            urlHistoric: getHistoricUrl(singleStationId)
        }
      }
    } else {
      // Grabing data for home page
      for (let i = 0; i < apiInfo.stationsId.length; i++) {
        urlArray[i] = {
          stationID: apiInfo.stationsId[i],
          urlCurrent: getCurrentConditionsUrl(apiInfo.stationsId[i]),
          urlHistoric: getHistoricUrl(apiInfo.stationsId[i])
        }
      }
    }

    return urlArray;
  }
}
