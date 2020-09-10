import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  stationId: string;
  newName: string;
  userId: string;
}

export default class RenameStationService {
  public async execute({ stationId, newName, userId }: Request): Promise<string> {
    stationId = stationId.toUpperCase();

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.checkUserExists({ userId });

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