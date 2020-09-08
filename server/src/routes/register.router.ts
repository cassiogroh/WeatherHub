import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const registerRouter = Router();

// Create new user
registerRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();
  const user = await createUserService.execute({ name, email, password });
  return response.json(user);
});

export default registerRouter;