import { Request, Response} from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import RefreshTokenService from '@modules/users/services/RefreshTokenService';

export default class SessionsController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
  
    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password
    });

    return response.json({user: classToClass(user), token});
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
  
    const refreshToken = container.resolve(RefreshTokenService);

    const { user, token } = await refreshToken.execute(id);

    return response.json({user: classToClass(user), token});
  }
}