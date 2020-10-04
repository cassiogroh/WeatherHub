import { Request, Response} from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async create (request: Request, response: Response): Promise<Response> {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });
  return response.status(200).json(classToClass(user));
  };

  public async delete (request: Request, response: Response): Promise<Response> {
    const userId = request.user.id

    const deleteUser = new DeleteUserService();
    const username = await deleteUser.execute({ userId });
    return response.status(200).json({ message: `User ${username} deleted` })
  }
};