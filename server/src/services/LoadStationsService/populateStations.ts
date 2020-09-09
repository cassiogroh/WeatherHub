import fetch from 'node-fetch';

import { apiInfo } from '../../utils/API_info';
import checkUserExists from '../../utils/checkUserExists';
import AppError from '../../errors/AppError';

interface StationProps {
  name: string;
  neighborhood: string;
  stationID: string;
  dewpt: number;
  elev: number;
  heatIndex: number;
  precipRate: number;
  precipTotal: number;
  pressure: number;
  temp: number;
  windChill: number;
  windGust: number;
  windSpeed: number;
  status: 'online' | 'offline';
}

interface Request {
  userRequest: boolean;
  urlArray: Array<{
    stationID: string;
    url: string;
  }>;
  userId?: string;
}

export default async function populateStations({ userRequest, urlArray, userId }: Request): Promise<object[]> {

if (userRequest) {
  var user = await checkUserExists({id: userId})
}

const unitSystem = apiInfo.units === 'm' ? 'metric' : 'imperial'; // Gets the unit system used to read data fetched

const offlineStations: string[] = [];

    const fetchedStations = await Promise.allSettled(
      urlArray.map((urls, index) =>
        fetch(urls.url)
          .then(response => response.json())
          .catch(err => offlineStations.push(urlArray[index].stationID))
          // returns 1 as value if it catches an error with status fulfilled
      )
    )

    const stationsArray: object[] = [];
    
    if (offlineStations.length) {
      var i = 0;
    }

    fetchedStations.map(data => {
      let station: StationProps = {} as StationProps;

      if (data.status === 'fulfilled' && data.value !== 1) {
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
        } = data.value.observations[0][unitSystem];

        station.neighborhood = data.value.observations[0].neighborhood;
        station.stationID = data.value.observations[0].stationID;
        station.dewpt = dewpt;
        station.elev = elev;
        station.heatIndex = heatIndex;
        station.precipRate = precipRate;
        station.precipTotal = precipTotal;
        station.pressure = pressure;
        station.temp = temp;
        station.windChill = windChill;
        station.windGust = windGust;
        station.windSpeed = windSpeed;
        station.status = 'online';

        if (!userRequest) {
          station.name = station.neighborhood;
        } else {
          const stationIndex = user.stations.findIndex(userStationId => userStationId === station.stationID)

          if (stationIndex < 0) {
            throw new AppError('Station index does not match', 404)
          }

          if (user.stations === user.stations_names) {
            station.name = station.neighborhood;
          }
          station.name = user.stations_names[stationIndex];
        }

        stationsArray.push(station);
      } else {
        station.stationID = offlineStations[i];
        station.status = 'offline';
        station.name = 'Estação offline'
        stationsArray.push(station);
        i++;
      }
    })

    return stationsArray;
  }