import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import AppError from '@shared/errors/AppError';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async checkUserExists(userId: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user;
  }

  public async checkEmailExists(email: string): Promise<void> {
    const checkEmailExists = await this.ormRepository.findOne({
      where: { email },
    })

    if (checkEmailExists) {
      throw new AppError('E-mail address already being used')
    }
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
    return;
  }
}

export default UsersRepository;