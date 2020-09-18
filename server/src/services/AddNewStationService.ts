import { getCustomRepository } from 'typeorm';
import { getUrl } from '../utils/API_info';
import fetch from 'node-fetch';

import UsersRepository from '../repositories/UsersRepository';

import LoadStationsService from './LoadStationsService/LoadStationsService';

import AppError from '../errors/AppError';

interface Request {
  stationId: string;
  userId: string;
}

export default class AddNewStationService {
  public async execute({ stationId, userId }: Request): Promise<object> {
    stationId = stationId.toUpperCase();
    const loadStation = new LoadStationsService();

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.checkUserExists({ userId });

    const checkStationExists = (): void => {
      const stationExists = user.stations.find(station => station === stationId);
      if (!!stationExists) {
        throw new AppError('Station alredy included', 401);
      }
    };

    const checkStationIsValid = async (): Promise<any> => {
      const response = 
      await fetch(getUrl(stationId))
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

    await usersRepository.save(user);

    const newStation = await loadStation.execute({userId, singleStationId: stationId});

    return newStation[0];
  }
}