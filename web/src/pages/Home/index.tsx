import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import Loader from 'react-loader-spinner';

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

  const handleEditStationName = useCallback(async (stationId: string): Promise<any> => {
    return console.log(stationId);
  }, []);

  const handleDeleteStation = useCallback(async (stationId: string): Promise<any> => {
    const userId = '8c81043e-4889-404a-b7e7-11608ed64524';

    const response = await api.delete('/users/delete', {
      data: {
        stationId,
        userId
      }
    });

    console.log(response.data)
    console.log(stations)
  }, [stations]);

  return (
    <>
      {!stations.length
      ?
      <div style= {{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 50}}>
        <p style= {{marginBottom: 20, fontSize: '2.4rem'}}>Carregando estações</p>
        <Loader type='Circles' color='#3b5998' height={100} width={100} />
      </div> 
      :
      <Container>
        <ToggleStats handleInputCheck={handleInputCheck} />

        <StationsStats>
          {stations.map((station: StationProps) => (
            station.status === 'online' ?
            <StationCard
              key={station.stationID}
              status={station.status}
              stationID={station.stationID}
              name={station.name}
              url={station.url}
              neighborhood={station.neighborhood}
              dewpt={station.dewpt}
              humidity={station.humidity}
              elev={station.elev}
              heatIndex={station.heatIndex}
              precipRate={station.precipRate}
              precipTotal={station.precipTotal}
              pressure={station.pressure}
              temp={station.temp}
              windChill={station.windChill}
              windGust={station.windGust}
              windSpeed={station.windSpeed}
              propsView={propsView}
              handleDeleteStation={handleDeleteStation}
              handleEditStationName={handleEditStationName}
            /> :
            <StationCard
              key={station.stationID}
              stationID={station.stationID}
              status={station.status}
              name={station.name}
              url={station.url}
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