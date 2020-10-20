import { container, inject, injectable } from 'tsyringe';
import fetch from 'node-fetch';

import { getCurrentConditionsUrl, getHistoricUrl } from '@config/api_info';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import LoadStationsService from './LoadStationsService/LoadStationsService';

import AppError from '@shared/errors/AppError';

interface Request {
  stationId: string;
  userId: string;
}

@injectable()
export default class AddNewStationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ stationId, userId }: Request): Promise<object> {
    stationId = stationId.toUpperCase();
    const loadStation = container.resolve(LoadStationsService);

    const user = await this.usersRepository.checkUserExists(userId);

    const checkStationExists = (): void => {
      const stationExists = user.stations.find(station => station === stationId);
      if (!!stationExists) {
        throw new AppError('Station alredy included', 401);
      }
    };

    const checkStationIsValid = async (): Promise<any> => {
      const response = 
      await fetch(getCurrentConditionsUrl(stationId))
      .catch(err => {
        throw new AppError('Invalid station ID or station is currently offline', 401);
      });

      if (response.status !== 200) {
        throw new AppError('Invalid station ID or station is currently offline', 401);
      } else {
        return response.json();
      }
    }

    checkStationExists();
    const response = await checkStationIsValid();

    user.stations.push(stationId);
    user.stations_names.push(response.observations[0].neighborhood);

    await this.usersRepository.save(user);

    const newStation = await loadStation.execute({userId, singleStationId: stationId});

    return newStation;
  }
}