import apiInfo from './API_info/API_info';
import fetch from 'node-fetch';

// interface LoadStations {
//   index: number;
//   userRequest: boolean;
//   url: string;
//   dbData?: string[];
//   firstTime?: boolean;
// }

// { index, userRequest, url, dbData, firstTime } : LoadStations  

class LoadStationsService {

  public async execute() {
    let i = 0;
    let urls: string[] = [];

    apiInfo.stationsId.map(stationId => {
      urls[i++] = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=${apiInfo.units}&apiKey=${apiInfo.apiKey}&numericPrecision=${apiInfo.numericPreicison}`;
    })

    const unitSystem = apiInfo.units === 'm' ? 'metric' : 'imperial'; // Gets the unit system used to read data fetched
    const stationsToLoad: any = {};

    const fetchedStations = await Promise.all(
      urls.map(url =>
        fetch(url)
          .then(res => {
            return res.json()
          })
          .catch(console.log)
      ));

    i = 0;
    const loadedStations = fetchedStations.map(station => {
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
      } = station.observations[0][unitSystem];

      stationsToLoad['station' + i] = new Object();
      stationsToLoad['station' + i].neighborhood = station.observations[0].neighborhood;
      stationsToLoad['station' + i].stationID = station.observations[0].stationID;
      stationsToLoad['station' + i].dewpt = dewpt;
      stationsToLoad['station' + i].elev = elev;
      stationsToLoad['station' + i].heatIndex = heatIndex;
      stationsToLoad['station' + i].precipRate = precipRate;
      stationsToLoad['station' + i].precipTotal = precipTotal;
      stationsToLoad['station' + i].pressure = pressure;
      stationsToLoad['station' + i].temp = temp;
      stationsToLoad['station' + i].windChill = windChill;
      stationsToLoad['station' + i].windGust = windGust;
      stationsToLoad['station' + i].windSpeed = windSpeed;
      i++;

      return stationsToLoad;
    })
    return loadedStations;
  }
}


export default LoadStationsService;