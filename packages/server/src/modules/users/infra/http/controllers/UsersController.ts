import { Request, Response} from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create (request: Request, response: Response): Promise<Response> {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);
  const user = await createUser.execute({ name, email, password });
  return response.status(200).json(classToClass(user));
  };

  public async delete (request: Request, response: Response): Promise<Response> {
    const userId = request.user.id

    const deleteUser = container.resolve(DeleteUserService);
    const username = await deleteUser.execute({ userId });
    return response.status(200).json({ message: `User ${username} deleted` })
  };

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, old_password, password } = request.body;
  
    const updateProfile = container.resolve(UpdateProfileService);
  
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password
    });
  
    return response.json(classToClass(user));
  }
};