import { EntityRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface UserRequest {
  userId: string;
}

interface EmailRequest {
  email: string;
}

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async checkUserExists({ userId }: UserRequest): Promise<User> {
    const user = await this.findOne({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user;
  }


  public async checkEmailExists({ email }: EmailRequest): Promise<void> {
    const checkEmailExists = await this.findOne({
      where: { email },
    })

    if (checkEmailExists) {
      throw new AppError('E-mail address already being used')
    }
  }
}

export default UsersRepository;