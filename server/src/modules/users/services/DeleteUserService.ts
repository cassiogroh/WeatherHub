import { getCustomRepository } from 'typeorm';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface Request {
  userId: string;
}

export default class DeleteUserService {
  public async execute({ userId }: Request): Promise<string> {

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.checkUserExists({ userId });

    await usersRepository.remove(user);

    return user.name;
  }
}