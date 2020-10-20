import React, { useState, useCallback, useEffect, useMemo } from 'react';
import api from '../../services/api';
import Loader from 'react-loader-spinner';

import Header from '../../components/Header';
import ForecastCard, { DaylyForecast, ForecastToday } from '../../components/ForecastCard';

import { Container, ForecastTodayContainer, DaylyForecastContainer } from './styles';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Location {
  latitude: number;
  longitude: number;
}

const Home: React.FC = () => {
  const [forecastToday, setForecastToday] = useState<ForecastToday>({} as ForecastToday);
  const [daylyForecast, setDaylyForecast] = useState<DaylyForecast[]>([]);

  const setLocation = useCallback( async (location: Location) => {
    const latitude = location.latitude;
    const longitude = location.longitude;

    // process.env.REACT_APP_GOOGLE_GEOCODE_API_KEY
    // Get address to show on top of forecast

    const response = await api.get('/', {
      headers: {
        latitude: latitude,
        longitude: longitude,
      }
    });
    setForecastToday(response.data[0]);
    setDaylyForecast(response.data[1]);
  }, []);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => setLocation(position.coords), console.log);
  }, [setLocation]);

  const sunRiseTime = useMemo(() => {
    if (forecastToday.sunriseTimeLocal) {
      const formattedSunRiseTime = format(
        new Date(forecastToday.sunriseTimeLocal),
        `HH':'mm' h'`,
        { locale: ptBR }
      );
  
      return formattedSunRiseTime;
    } else {
      return null;
    }
  }, [forecastToday.sunriseTimeLocal]);

  const sunsetTime = useMemo(() => {
    if (forecastToday.sunsetTimeLocal) {
      const formattedSunsetTime = format(
        new Date(forecastToday.sunsetTimeLocal),
        `HH':'mm' h'`,
        { locale: ptBR }
      );
  
      return formattedSunsetTime
    } else {
      return null;
    }
  }, [forecastToday.sunsetTimeLocal]);

  const currentDay = useMemo(() => {
    if (forecastToday.sunsetTimeLocal) {
      const formattedCurrentDay = format(
        new Date(forecastToday.sunsetTimeLocal),
        `dd '/' MMM`,
        { locale: ptBR }
      );
  
      return formattedCurrentDay;
    } else {
      return null;
    }
  }, [forecastToday.sunsetTimeLocal]);
  
  return (
    <>
      <Header currentPage={'Home'} />
      {!forecastToday
      ?
      <div style= {{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 130}}>
        <p style= {{marginBottom: 20, fontSize: '2.4rem'}}>Carregando</p>
        <Loader type='Circles' color='#3b5998' height={100} width={100} />
      </div> 
      :
      <Container>
        <ForecastTodayContainer>
          {forecastToday.iconCode ?
            <img src={require(`../../assets/png-icons/${('0' + forecastToday.iconCode).slice(-2)}.png`)} alt="Forecast icon"/> :
            <img src={require(`../../assets/png-icons/na.png`)} alt="Forecast icon"/>  
          }
          <main>
            <h2>{forecastToday.dayOfWeek} {currentDay ? ', ' + currentDay : ''}</h2>

            <div>
              <p>{forecastToday.narrative}</p>
              <p>{forecastToday.moonPhase ? forecastToday.moonPhase : ''}</p>
              <p>Mínima<span>{!isNaN(forecastToday.temperatureMin) ? forecastToday.temperatureMin + ' °C' : '--'}</span></p>
              <p>Máxima<span>{!isNaN(forecastToday.temperatureMax) && forecastToday.temperatureMax !== null ? forecastToday.temperatureMax + ' °C' : '--'}</span></p>
              <p>Nascer do sol<span>{sunRiseTime ? sunRiseTime: '--'}</span></p>
              <p>Pôr do sol<span>{sunsetTime ? sunsetTime: '--'}</span></p>
            </div>
          </main>
        
          <footer>
            <h2>{forecastToday.daypartName}</h2>

            <div>
              <p>Temperatura<span>{!isNaN(forecastToday.temperature) ? forecastToday.temperature + ' °C' : '--'}</span></p>
              <p>Índice de calor<span>{!isNaN(forecastToday.temperatureHeatIndex) ? forecastToday.temperatureHeatIndex + ' °C' : '--'}</span></p>
              <p>Sensação térmica<span>{!isNaN(forecastToday.temperatureWindChill) ? forecastToday.temperatureWindChill + ' °C' : '--'}</span></p>
              <p>Humidade relativa<span>{!isNaN(forecastToday.relativeHumidity) ? forecastToday.relativeHumidity + ' %' : '--'}</span></p>
              <p>Chance de chuva<span>{!isNaN(forecastToday.precipChance) ? forecastToday.precipChance + ' %' : '--'}</span></p>
              <p>Chuva esperada<span>{!isNaN(forecastToday.expectedRain) ? forecastToday.expectedRain + ' mm' : '--'}</span></p>
            </div>
          </footer>
        </ForecastTodayContainer>

        <DaylyForecastContainer>
          {
            daylyForecast.map(data => (
              <ForecastCard key={data.dayOfWeek} daylyForecast={data} />
            ))
          }
        </DaylyForecastContainer>
      </Container>
      }
    </>
  )
};

export default Home;