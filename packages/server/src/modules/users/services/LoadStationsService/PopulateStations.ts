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
      const permitedTime = isAfter(now, quarterAfterMidnight);
      return permitedTime;
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
        urlArray.map((urls, index) =>
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

        station.neighborhood = data.value.observations[0].neighborhood;
        station.stationID = data.value.observations[0].stationID;
        station.url = `http://www.wunderground.com/personal-weather-station/dashboard?ID=${station.stationID}`
        station.dewpt = dewpt.toFixed(1);
        station.humidity = data.value.observations[0].humidity.toFixed(1);
        station.elev = elev.toFixed(1);
        station.heatIndex = heatIndex.toFixed(1);
        station.precipRate = precipRate.toFixed(1);
        station.precipTotal = precipTotal.toFixed(1);
        station.pressure = pressure.toFixed(1);
        station.temp = temp.toFixed(1);
        station.windChill = windChill.toFixed(1);
        station.windGust = windGust.toFixed(1);
        station.windSpeed = windSpeed.toFixed(1);
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
      let station: StationProps = {} as StationProps;

      if (data.status === 'fulfilled' && isNaN(data.value) ) {
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
        = data.value.summaries[6][unitSystem];

        station.humidityHigh = data.value.summaries[6].humidityHigh.toFixed(1);
        station.humidityLow = data.value.summaries[6].humidityLow.toFixed(1);
        station.humidityAvg = data.value.summaries[6].humidityAvg.toFixed(1);
        station.tempHigh = tempHigh.toFixed(1);
        station.tempLow = tempLow.toFixed(1);
        station.tempAvg = tempAvg.toFixed(1);
        station.windspeedHigh = windspeedHigh.toFixed(1);
        station.windspeedLow = windspeedLow.toFixed(1);
        station.windspeedAvg = windspeedAvg.toFixed(1);
        station.windgustHigh = windgustHigh.toFixed(1);
        station.windgustLow = windgustLow.toFixed(1);
        station.windgustAvg = windgustAvg.toFixed(1);
        station.dewptHigh = dewptHigh.toFixed(1);
        station.dewptLow = dewptLow.toFixed(1);
        station.dewptAvg = dewptAvg.toFixed(1);
        station.windchillHigh = windchillHigh.toFixed(1);
        station.windchillLow = windchillLow.toFixed(1);
        station.windchillAvg = windchillAvg.toFixed(1);
        station.heatindexHigh = heatindexHigh.toFixed(1);
        station.heatindexLow = heatindexLow.toFixed(1);
        station.heatindexAvg = heatindexAvg.toFixed(1);
        station.pressureMax = pressureMax.toFixed(1);
        station.pressureMin = pressureMin.toFixed(1);

        stationsHistoricArray.push(station);
      }
    }) :
    stationsHistoricArray = [{...Array(stationsCurrentArray.length).keys()}];

    return [stationsCurrentArray, stationsHistoricArray];
  }
}
