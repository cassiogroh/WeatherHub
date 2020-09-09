import { getRepository } from 'typeorm';

import User from '../models/User';
import checkUserExists from '../utils/checkUserExists';
import AppError from '../errors/AppError';

interface Request {
  stationId: string;
  id: string;
}

export default class DeleteStationService {
  public async execute({ stationId, id }: Request): Promise<string[]> {
    stationId = stationId.toUpperCase();

    const usersRepository = getRepository(User);

    const user = await checkUserExists({ id });

    const stationIndex = user.stations.findIndex(station => station === stationId);
    
    if (stationIndex < 0) {
      throw new AppError('Station not found', 404);
    }

    user.stations.splice(stationIndex, 1);

    await usersRepository.save(user);

    return user.stations;
  }
}