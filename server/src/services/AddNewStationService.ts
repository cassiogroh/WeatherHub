import { getRepository } from 'typeorm';

import { getUrl } from '../utils/API_info';
import User from '../models/User';
import checkUserExists from '../utils/checkUserExists';
import AppError from '../errors/AppError';
import fetch from 'node-fetch';

interface Request {
  stationId: string;
  id: string;
}

export default class AddNewStationService {
  public async execute({ stationId, id }: Request): Promise<string[]> {
    stationId = stationId.toUpperCase();

    const usersRepository = getRepository(User);

    const user = await checkUserExists({ id });

    const checkStationExists = (): void => {
      const stationExists = user.stations.find(station => station === stationId);
      if (!!stationExists) {
        throw new AppError('Station alredy included', 401);
      }
    };

    const checkStationIsValid = async (): Promise<void> => {
      const response = await fetch(getUrl(stationId)).catch(err => {
        throw new AppError('Invalid station ID or station is currently offline', 401);
      });

      if (response.status !== 200) {
        throw new AppError('Invalid station ID or station is currently offline', 401);
      };
    }

    checkStationExists();
    await checkStationIsValid();

    user.stations.push(stationId);
    user.stations_names.push(stationId);

    await usersRepository.save(user);

    return user.stations;
  }
}