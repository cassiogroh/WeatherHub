import apiInfo from './API_info/API_info';
import fetch from 'node-fetch';

// interface LoadStations {
//   index: number;
//   userRequest: boolean;
//   url: string;
//   dbData?: string[];
//   firstTime?: boolean;
// }

interface StationProps {
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
}

// { index, userRequest, url, dbData, firstTime } : LoadStations  

class LoadStationsService {

  public async execute() {
    const unitSystem = apiInfo.units === 'm' ? 'metric' : 'imperial'; // Gets the unit system used to read data fetched

    let i = 0;
    let urls: string[] = [];

    apiInfo.stationsId.map(stationId => {
      urls[i++] = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=${apiInfo.units}&apiKey=${apiInfo.apiKey}&numericPrecision=${apiInfo.numericPreicison}`;
    })

    const fetchedStations = await Promise.all(
      urls.map(url =>
        fetch(url)
          .then(res => {
            return res.json()
          })
          .catch(console.log)
      ));

    const stationsArray: object[] = [];

    fetchedStations.map(data => {
      let station: StationProps = {} as StationProps;

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
      } = data.observations[0][unitSystem];

      station.neighborhood = data.observations[0].neighborhood;
      station.stationID = data.observations[0].stationID;
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

      stationsArray.push(station)
      console.log(stationsArray)
    })

    return stationsArray;
  }
}

export default LoadStationsService;