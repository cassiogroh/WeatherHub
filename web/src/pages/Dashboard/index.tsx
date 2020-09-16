import React, { useState, useEffect, useCallback } from 'react';
import Loader from 'react-loader-spinner';

import api from '../../services/api';

import ToggleStats from '../../components/ToggleStats';
import StationCard, { StationProps, ViewProps } from '../../components/StationCard';

import { useAuth } from '../../hooks/auth';

import { Container, StationsStats } from './styles';

const Dashboard: React.FC = () => {
  const { user, token, signOut } = useAuth();

  const [ stations, setStations ] = useState<StationProps[]>([]);
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

      const loadedStations = await api.get('/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'userId': user.id
        }
      });
      setStations(loadedStations.data);
    }
    getStations();
  }, [user.id, token]);

  const handleDeleteStation = useCallback(async (stationId: string): Promise<void> => {
    setStations(state => state.filter(station => station.stationID !== stationId));

    await api.delete('/users/delete', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'stationId': stationId,
        'userId': user.id
      }
    });
  }, [user.id, token]);

  return (
    <>
      <button type='button' onClick={signOut} style={{backgroundColor: 'transparent'}}>Logout</button>

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
              station={station}
              propsView={propsView}
              handleDeleteStation={handleDeleteStation}
              user={user}
            /> :
            <StationCard
              key={station.stationID}
              station={station}
              handleDeleteStation={handleDeleteStation}
              user={user}
            />
            )
          )}
        </StationsStats>
      </Container>
      }
    </>
  )
};

export default Dashboard;