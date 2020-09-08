import apiInfo from '../utils/API_info';
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
  status: 'online' | 'offline';
}

interface urlArray {
  stationID: string;
  url: string;
}

// { index, userRequest, url, dbData, firstTime } : LoadStations  

class LoadStationsService {

  public async execute() {
    const unitSystem = apiInfo.units === 'm' ? 'metric' : 'imperial'; // Gets the unit system used to read data fetched

    const urlArray: urlArray[] = [];
    
    for (let i=0; i<apiInfo.stationsId.length; i++) {
      urlArray[i] = {
        stationID: apiInfo.stationsId[i],
        url: `https://api.weather.com/v2/pws/observations/current?stationId=${apiInfo.stationsId[i]}&format=json&units=${apiInfo.units}&apiKey=${apiInfo.apiKey}&numericPrecision=${apiInfo.numericPreicison}`
      }
    }
    
    const offlineStations: string[] = [];

    const fetchedStations = await Promise.allSettled(
      urlArray.map((urls, index, url) =>
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

        stationsArray.push(station);
      } else {
        station.stationID = offlineStations[i];
        station.status = 'offline';
        stationsArray.push(station);
        i++;
      }
    })

    return stationsArray;
  }
}

export default LoadStationsService;