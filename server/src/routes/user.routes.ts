import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import LoadStationsService from '../services/LoadStationsService/LoadStationsService';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import AddNewStationService from '../services/AddNewStationService';
import DeleteStationService from '../services/DeleteStationService';
import RenameStationService from '../services/RenameStationService';

const userRouter = Router();

// Create new user
userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });
  return response.status(200).json(user);
});


// Verify authentication
userRouter.use(ensureAuthenticated)


// User's dashboard
userRouter.get('/', async (request, response) => {
  const { userId } = request.body;

  const loadStations = new LoadStationsService();
  const userStations = await loadStations.execute({ userId })
  return response.status(200).json(userStations)
})


// Delete a user
userRouter.delete('/', async (request, response) => {
  const { userId } = request.body;

  const deleteUser = new DeleteUserService();
  const username = await deleteUser.execute({ userId });
  return response.status(200).json({ message: `User ${username} deleted` })
});


// Add a station to user's dashboard
userRouter.post('/add', async (request, response) => {
  const { stationId, userId } = request.body;

  const addNewStation = new AddNewStationService();
  const userStations = await addNewStation.execute({
    stationId,
    userId
  });
  return response.status(200).json(userStations);
})


// Remove a station from user's dashboard
userRouter.delete('/delete', async (request, response) => {
  const { stationId, userId } = request.body;

  const deleteStation = new DeleteStationService();
  const userStations = await deleteStation.execute({
    stationId,
    userId
  });
  return response.status(200).json(userStations);
})

// Rename a station
userRouter.put('/rename-station', async (request, response) => {
  const { stationId, newName, userId } = request.body;

  const renameStation = new RenameStationService();
  const userStationsNames = await renameStation.execute({
    stationId,
    newName,
    userId
  });
  return response.status(200).json(userStationsNames);
})

export default userRouter;