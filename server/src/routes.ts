import express, { Request, Response } from 'express';

import loadStations from './services/loadStations';
import apiInfo from './services/API_info/API_info';

export default function homePage( request: Request, response: Response) {

  loadStations().then(stationsData => {
    let unitSystem = apiInfo.units === 'm' ? 'metric' : 'imperial'; // Gets the unit system used to read data fetched

    let stationsToLoad: any = {};
    let i = 0;

    stationsData.map(stationData => {
      let neighborhood = stationData.observations[0].neighborhood;

      let {
        dewpt,
        elev,
        heatIndex,
        precipRate,
        precipTotal,
        pressure,
        temp,
        windChill,
        windGust,
        windSpeed
      } = stationData.observations[0][unitSystem] // Destructuring to simplify variables creation

      stationsToLoad['info' + i] = new Object();
      stationsToLoad['info' + i].dewpt = dewpt;
      i++;

      console.log(stationsToLoad.info0)
    });

    response.send(stationsToLoad)

  })
    .catch(console.log)
}

