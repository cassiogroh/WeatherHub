import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';

const userRouter = Router();

// Create new user
userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });
  return response.json(user);
});

// Verify authentication
userRouter.use(ensureAuthenticated)

// User dashboard
userRouter.get('/', async (request, response) => {
  return response.json('logado')
})

// Delete a user
userRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const deleteUserService = new DeleteUserService();
  const username = await deleteUserService.execute({ id });
  return response.status(200).json({ message: `User ${username} deleted` })
});

// Add a station to user's dashboard
userRouter.post('/add', async (request, response) => {
  const { stationId } = request.body;

  
})

// Remove a station from user's dashboard
// userRouter.delete('/delete', async (request, response) => {

// })

// Edit the name of a station
// userRouter.put('/edit', async (request, response) => {

// })

export default userRouter;