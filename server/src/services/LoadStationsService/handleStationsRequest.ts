import { getRepository } from 'typeorm';

import apiInfo from '../../utils/API_info';
import User from '../../models/User';
import AppError from '../../errors/AppError';

interface Request {
  userRequest: boolean;
  userId?: string;
}

interface urlArray {
  stationID: string;
  url: string;
}

export default async function handleStationsRequest({ userRequest, userId }: Request): Promise<urlArray[]> {

  const urlArray: urlArray[] = [];
  
  // Grabing data for home page
  if (!userRequest) {

    for (let i=0; i<apiInfo.stationsId.length; i++) {
      urlArray[i] = {
        stationID: apiInfo.stationsId[i],
        url: `https://api.weather.com/v2/pws/observations/current?stationId=${apiInfo.stationsId[i]}&format=json&units=${apiInfo.units}&apiKey=${apiInfo.apiKey}&numericPrecision=${apiInfo.numericPreicison}`
      }
    }
    
  } else {
    // Grabing data for use page
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userStations = user.stations;
    // const userStationsNames = user.stations_names;

    for (let i=0; i<userStations.length; i++) {
      urlArray[i] = {
        stationID: userStations[i],
        url: `https://api.weather.com/v2/pws/observations/current?stationId=${userStations[i]}&format=json&units=${apiInfo.units}&apiKey=${apiInfo.apiKey}&numericPrecision=${apiInfo.numericPreicison}`
      }
    }
  }

  return urlArray;
  }