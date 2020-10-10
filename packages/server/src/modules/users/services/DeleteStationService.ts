import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  stationId: string;
  userId: string;
}

@injectable()
export default class DeleteStationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ stationId, userId }: Request): Promise<void> {
    
    stationId = stationId.toUpperCase();

    const user = await this.usersRepository.checkUserExists(userId);

    const stationIndex = user.stations.findIndex(station => station === stationId);

    if (stationIndex < 0) {
      throw new AppError('Station not found', 404);
    }

    user.stations.splice(stationIndex, 1);
    user.stations_names.splice(stationIndex, 1);

    await this.usersRepository.save(user);

    return;
  }
}