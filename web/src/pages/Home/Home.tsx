import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import StationCard, { StationProps } from '../../components/StationCard/StationCard';

import api from '../../services/api';

import './Home.css';

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

      <div className="station-card-grid">
        
        {
          !stations.length ? <h1>Carregando Estações...</h1> :

          stations.map((station: StationProps) => (
            <StationCard
              key={station.stationID}
              neighborhood={station.neighborhood}
              stationID={station.stationID}
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
              />
            )
          )
        }
        
      </div>
    </>
  )
};

export default Home;