import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
}

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  
  public async execute({ userId }: Request): Promise<string> {

    const user = await this.usersRepository.checkUserExists(userId);

    await this.usersRepository.remove(user);

    return user.name;
  }
}