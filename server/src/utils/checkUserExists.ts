import { getRepository } from 'typeorm';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  id: string | undefined;
}

export default async function checkUserExists({ id }: Request): Promise<User> {

  const usersRepository = getRepository(User);

  const checkUserExists = await usersRepository.findOne({
    where: { id },
  })

  if (!checkUserExists) {
    throw new AppError('User not found', 404)
  }

  return checkUserExists;
}