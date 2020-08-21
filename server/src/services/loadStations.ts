import apiInfo from './API_info/API_info';
import fetch from 'node-fetch';

interface LoadStations {
  index: number;
  userRequest: boolean;
  url: string;
  dbData?: string[];
  firstTime?: boolean;
}

// { index, userRequest, url, dbData, firstTime } : LoadStations  

export default function loadStations() {

  let urls: string[] = [];
  let i = 0;

  apiInfo.stationsId.map(stationId => {
    urls[i++] = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=${apiInfo.units}&apiKey=${apiInfo.apiKey}&numericPrecision=${apiInfo.numericPreicison}`;
  })

  
  return Promise.all(
    urls.map(url =>
      fetch(url)
      .then(res => res.json())
  ));
  
}