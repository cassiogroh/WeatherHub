import { getRepository } from 'typeorm';

import checkUserExists from '../utils/checkUserExists';
import User from '../models/User';

interface Request {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: Request): Promise<string> {

    const usersRepository = getRepository(User);
    
    const user = await checkUserExists({ id });

    await usersRepository.remove(user);

    return user.name;
  }
}