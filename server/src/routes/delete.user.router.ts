import { Router } from 'express';

import DeleteUserService from '../services/DeleteUserService';

const deleteUserRouter = Router();

// Delete a user
deleteUserRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const deleteUserService = new DeleteUserService();
  const username = await deleteUserService.execute({ id });
  return response.status(200).json({ message: `User ${username} deleted` })
});

export default deleteUserRouter;