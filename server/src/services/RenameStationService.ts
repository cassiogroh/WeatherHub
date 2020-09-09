import { getRepository } from 'typeorm';

import User from '../models/User';
import checkUserExists from '../utils/checkUserExists';
import AppError from '../errors/AppError';

interface Request {
  stationId: string;
  newName: string;
  id: string;
}

export default class RenameStationService {
  public async execute({ stationId, newName, id }: Request): Promise<string> {
    stationId = stationId.toUpperCase();

    const usersRepository = getRepository(User);

    const user = await checkUserExists({ id });

    const stationIndex = user.stations.findIndex(station => station === stationId);
    
    if (stationIndex < 0) {
      throw new AppError('Station not found', 404);
    }

    user.stations_names.find(stationName => {
      if (stationName === newName) {
        throw new AppError('Name already exists, please try another one', 401)
      }
    })

    user.stations_names.splice(stationIndex, 1, newName);

    await usersRepository.save(user);

    return newName;
  }
}