import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

interface Request {
  stationId: string;
  userId: string;
}

export default class DeleteStationService {
  public async execute({ stationId, userId }: Request): Promise<void> {
    
    stationId = stationId.toUpperCase();

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.checkUserExists({ userId });

    const stationIndex = user.stations.findIndex(station => station === stationId);

    if (stationIndex < 0) {
      throw new AppError('Station not found', 404);
    }

    user.stations.splice(stationIndex, 1);
    user.stations_names.splice(stationIndex, 1);

    await usersRepository.save(user);
  }
}