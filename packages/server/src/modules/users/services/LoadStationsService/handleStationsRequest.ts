import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { apiInfo, getUrl } from '@config/api_info';

interface Request {
  userId?: string;
  singleStationId?: string;
}

interface urlArray {
  stationID: string;
  url: string;
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
}