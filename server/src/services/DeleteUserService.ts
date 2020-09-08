import { getRepository } from 'typeorm';

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
      throw new Error('404 User not found')
    }

    const user = checkUserExists;

    await usersRepository.remove(user);

    return user.name;
  }
}