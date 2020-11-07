import { inject, injectable } from 'tsyringe';
import fetch from 'node-fetch';
import { isAfter, getDate, getMonth, getYear } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import StationProps from '@modules/users/dtos/IStationPropsDTO';

import { apiInfo } from '@config/api_info';

import AppError from '@shared/errors/AppError';

interface Request {
  urlArray: Array<{
    stationID: string;
    urlCurrent: string;
    urlHistoric: string;
  }>;
  userId?: string;
}

@injectable()
export default class PopulateStations{
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {};

  public async execute({ urlArray, userId }: Request): Promise<object[]> {
    if (userId) {
      var user = await this.usersRepository.checkUserExists(userId);
    }

    const unitSystem = apiInfo.units === 'm' ? 'metric' : 'imperial'; // Gets the unit system used to read data fetched

    const offlineStations: string[] = [];

    const isQuarterAfterMidnight = () => {
      const now = Date.now();
      const quarterAfterMidnight = new Date(getYear(now), getMonth(now), getDate(now), 0, 15, 0);
      return isAfter(now, quarterAfterMidnight);
    }

    const StationsCurrentData = await Promise.allSettled(
      urlArray.map((urls, index) =>
        fetch(urls.urlCurrent)
          .then(response => response.json())
          .catch(err => offlineStations.push(urlArray[index].stationID))
      )
    )

    let StationsHistoricData = null;
    isQuarterAfterMidnight() &&
    (
      StationsHistoricData = await Promise.allSettled(
        urlArray.map((urls) =>
          fetch(urls.urlHistoric)
            .then(response => response.json())
            .catch(err => console.log('Error fetching historic data: ', err))
        )
      )
    )

    const stationsCurrentArray: object[] = [];
    let stationsHistoricArray: object[] = [];

    if (offlineStations.length) {
      var i = 0;
    }

    StationsCurrentData.map(data => {
      let station: StationProps = {} as StationProps;

      if (data.status === 'fulfilled' && isNaN(data.value) ) {
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

        let { humidity } = data.value.observations[0]

        station.neighborhood = data.value.observations[0].neighborhood;
        station.stationID = data.value.observations[0].stationID;
        station.url = `http://www.wunderground.com/personal-weather-station/dashboard?ID=${station.stationID}`
        station.dewpt = dewpt || dewpt === 0 ? dewpt.toFixed(1) : null;
        station.humidity = humidity || humidity === 0 ? humidity.toFixed(1) : null;
        station.elev = elev || elev === 0 ? elev.toFixed(1) : null;
        station.heatIndex = heatIndex || heatIndex === 0 ? heatIndex.toFixed(1) : null;
        station.precipRate = precipRate || precipRate === 0 ? precipRate.toFixed(1) : null;
        station.precipTotal = precipTotal || precipTotal === 0 ? precipTotal.toFixed(1) : null;
        station.pressure = pressure || pressure === 0 ? pressure.toFixed(1) : null;
        station.temp = temp || temp === 0 ? temp.toFixed(1) : null;
        station.windChill = windChill || windChill === 0 ? windChill.toFixed(1) : null;
        station.windGust = windGust || windGust === 0 ? windGust.toFixed(1) : null;
        station.windSpeed = windSpeed || windSpeed === 0 ? windSpeed.toFixed(1) : null;
        station.status = 'online';

        if (!userId) {
          station.name = station.neighborhood;
        } else {
          const stationIndex = user.stations.findIndex(userStationId => userStationId === station.stationID)

          if (stationIndex < 0) {
            throw new AppError('Station index does not match', 404)
          }

          if (user.stations === user.stations_names) {
            return station.name = station.neighborhood;
          }
          station.name = user.stations_names[stationIndex];
        }

        stationsCurrentArray.push(station);
      } else {
        station.status = 'offline';
        station.stationID = offlineStations[i];
        station.url = `http://www.wunderground.com/personal-weather-station/dashboard?ID=${offlineStations[i]}`

        if (!userId) {
          station.name = offlineStations[i];
        } else {
          const stationIndex = user.stations.findIndex(userStationId => userStationId === station.stationID)

          if (stationIndex < 0) {
            throw new AppError('Station index does not match', 404)
          }
          station.name = user.stations_names[stationIndex];
        }

        stationsCurrentArray.push(station);
        i++;
      }
    });

    isQuarterAfterMidnight() && StationsHistoricData ?
    StationsHistoricData.map(data => {
      let station: StationProps[] = [] as StationProps[];

      if (data.status === 'fulfilled' && isNaN(data.value) ) {
        
        data.value.summaries.map((historicData: any) => {
          let stationHistoric: StationProps = {} as StationProps;

          let {
            tempHigh,
            tempLow,
            tempAvg,
            windspeedHigh,
            windspeedLow,
            windspeedAvg,
            windgustHigh,
            windgustLow,
            windgustAvg,
            dewptHigh,
            dewptLow,
            dewptAvg,
            windchillHigh,
            windchillLow,
            windchillAvg,
            heatindexHigh,
            heatindexLow,
            heatindexAvg,
            pressureMax,
            pressureMin,
          }
          = historicData[unitSystem];
  
          let {
            humidityLow,
            humidityAvg,
            humidityHigh
          } = historicData;
  
          stationHistoric.humidityHigh = humidityHigh || humidityHigh === 0 ? humidityHigh.toFixed(1) : null;
          stationHistoric.humidityLow = humidityLow || humidityLow === 0 ? humidityLow.toFixed(1) : null;
          stationHistoric.humidityAvg = humidityAvg || humidityAvg === 0 ? humidityAvg.toFixed(1) : null;
          stationHistoric.tempHigh = tempHigh || tempHigh === 0 ? tempHigh.toFixed(1) : null;
          stationHistoric.tempLow = tempLow || tempLow === 0 ? tempLow.toFixed(1) : null;
          stationHistoric.tempAvg = tempAvg || tempAvg === 0 ? tempAvg.toFixed(1) : null;
          stationHistoric.windspeedHigh = windspeedHigh || windspeedHigh === 0 ? windspeedHigh.toFixed(1) : null;
          stationHistoric.windspeedLow = windspeedLow || windspeedLow === 0 ? windspeedLow.toFixed(1) : null;
          stationHistoric.windspeedAvg = windspeedAvg || windspeedAvg === 0 ? windspeedAvg.toFixed(1) : null;
          stationHistoric.windgustHigh = windgustHigh || windgustHigh === 0 ? windgustHigh.toFixed(1) : null;
          stationHistoric.windgustLow = windgustLow || windgustLow === 0 ? windgustLow.toFixed(1) : null;
          stationHistoric.windgustAvg = windgustAvg || windgustAvg === 0 ? windgustAvg.toFixed(1) : null;
          stationHistoric.dewptHigh = dewptHigh || dewptHigh === 0 ? dewptHigh.toFixed(1) : null;
          stationHistoric.dewptLow = dewptLow || dewptLow === 0 ? dewptLow.toFixed(1) : null;
          stationHistoric.dewptAvg = dewptAvg || dewptAvg === 0 ? dewptAvg.toFixed(1) : null;
          stationHistoric.windchillHigh = windchillHigh || windchillHigh === 0 ? windchillHigh.toFixed(1) : null;
          stationHistoric.windchillLow = windchillLow || windchillLow === 0 ? windchillLow.toFixed(1) : null;
          stationHistoric.windchillAvg = windchillAvg || windchillAvg === 0 ? windchillAvg.toFixed(1) : null;
          stationHistoric.heatindexHigh = heatindexHigh || heatindexHigh === 0 ? heatindexHigh.toFixed(1) : null;
          stationHistoric.heatindexLow = heatindexLow || heatindexLow === 0 ? heatindexLow.toFixed(1) : null;
          stationHistoric.heatindexAvg = heatindexAvg || heatindexAvg === 0 ? heatindexAvg.toFixed(1) : null;
          stationHistoric.pressureMax = pressureMax || pressureMax === 0 ? pressureMax.toFixed(1) : null;
          stationHistoric.pressureMin = pressureMin || pressureMin === 0 ? pressureMin.toFixed(1) : null;
  
          station.push(stationHistoric);
        })

        stationsHistoricArray.push(station);
      }
    })
    : stationsHistoricArray = [{...Array(stationsCurrentArray.length).keys()}];

    return [stationsCurrentArray, stationsHistoricArray];
  }
}
