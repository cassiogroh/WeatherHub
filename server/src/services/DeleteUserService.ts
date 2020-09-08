import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: Request): Promise<string> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { id },
    })

    if (!checkUserExists) {
      throw new AppError('User not found', 404)
    }

    const user = checkUserExists;

    await usersRepository.remove(user);

    return user.name;
  }
}