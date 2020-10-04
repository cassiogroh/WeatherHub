import { Request, Response} from 'express';

// index, show, create, update, delete

import LoadStationsService from '@modules/users/services/LoadStationsService/LoadStationsService';
import AddNewStationService from '@modules/users/services/AddNewStationService';
import DeleteStationService from '@modules/users/services/DeleteStationService';
import RenameStationService from '@modules/users/services/RenameStationService';

export default class StationsController {
  public async index (request: Request, response: Response): Promise<Response> {
    const userId = request.user.id

    const loadStations = new LoadStationsService();
    const userStations = await loadStations.execute({ userId })
    return response.status(200).json(userStations)
  };

  public async create (request: Request, response: Response): Promise<Response> {
    const userId = request.user.id
    const { stationId } = request.body;

    const addNewStation = new AddNewStationService();
    const newStation = await addNewStation.execute({
      stationId,
      userId
    });
    return response.status(200).json(newStation);
  };

  public async delete (request: Request, response: Response): Promise<Response> {
    const userId = request.user.id
    const headers = request.headers;

    const stationId = headers.stationid as string;

    const deleteStation = new DeleteStationService();
    await deleteStation.execute({
      stationId,
      userId
    });

    return response.status(200).json({success: 'Station deleted'})
  };

  public async update (request: Request, response: Response): Promise<Response> {
    const userId = request.user.id
    const { stationId, newName }= request.body;

    const renameStation = new RenameStationService();
    await renameStation.execute({
      stationId,
      newName,
      userId
    });
    return response.status(200).json(newName);
  };
}