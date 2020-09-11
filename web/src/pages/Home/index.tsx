import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Header from '../../components/Header';
import StationCard, { StationProps } from '../../components/StationCard';


import { Container } from './styles';

const Home = () => {

  const [ stations, setStations ] = useState([]);

  useEffect(() => {
    const getStations = async() => {
      const loadedStations = await api.get('/');

      setStations(loadedStations.data);
    }

    getStations();
  }, [])

  return (
    <>
      <Header />

      <Container>
        
        {
          !stations.length ? <h1>Carregando Estações...</h1> :

          stations.map((station: StationProps) => (
            station.status === 'online' ?
            <StationCard
              key={station.stationID}
              status={station.status}
              stationID={station.stationID}
              name={station.name}
              url={station.url}
              neighborhood={station.neighborhood}
              dewpt={station.dewpt}
              elev={station.elev}
              heatIndex={station.heatIndex}
              precipRate={station.precipRate}
              precipTotal={station.precipTotal}
              pressure={station.pressure}
              temp={station.temp}
              windChill={station.windChill}
              windGust={station.windGust}
              windSpeed={station.windSpeed}
            /> :
            <StationCard
              key={station.stationID}
              stationID={station.stationID}
              status={station.status}
              name={station.name}
              url={station.url}
            />
            )
          )
        }
        
      </Container>
    </>
  )
};

export default Home;