import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import Loader from 'react-loader-spinner';

import Header from '../../components/Header';
import ToggleStats from '../../components/ToggleStats';
import StationCard, { StationProps, ViewProps } from '../../components/StationCard';

import { Container, StationsStats } from './styles';

const Home: React.FC = () => {
  const [ stations, setStations ] = useState([]);
  const [ propsView, setPropsView ] = useState<ViewProps>({
    temp: true,
    dewpt: false,
    heatIndex: false,
    windChill: false,
    humidity: true,
    precipTotal: true,
    precipRate: false,
    windGust: false,
    windSpeed: false,
    pressure: false,
    elev: false,
  });
  
  const handleInputCheck = useCallback((value: boolean, propName: keyof(typeof propsView)): void => {
      const changedPropsView = {...propsView};
      changedPropsView[propName] = value;

      setPropsView(changedPropsView);
  }, [propsView]);

  useEffect(() => {
    const getStations = async() => {
      const loadedStations = await api.get('/');
      setStations(loadedStations.data);
    }
    getStations();
  }, [])

  return (
    <>
      <Header currentPage={'Home'} />
      {!stations.length
      ?
      <div style= {{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 130}}>
        <p style= {{marginBottom: 20, fontSize: '2.4rem'}}>Carregando estações</p>
        <Loader type='Circles' color='#3b5998' height={100} width={100} />
      </div> 
      :
      <Container>
        <ToggleStats handleInputCheck={handleInputCheck} />

        <StationsStats>
          {stations.map((station: StationProps) => (
            <StationCard
              key={station.stationID}
              station={station}
              propsView={station.status === 'online' ? propsView : undefined}
            />
            )
          )}
        </StationsStats>
      </Container>
      }
    </>
  )
};

export default Home;