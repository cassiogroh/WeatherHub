import React, { useState, useEffect, useCallback, useRef } from 'react';
import Loader from 'react-loader-spinner';

import api from '../../services/api';

import Header from '../../components/Header';
import ToggleStats from '../../components/ToggleStats';
import StationCard, { StationProps, ViewProps } from '../../components/StationCard';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, StationsStats } from './styles';

const Dashboard: React.FC = () => {
  const { user, token, signOut } = useAuth();
  const { addToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const [ stations, setStations ] = useState<StationProps[]>([]);
  const [ triggerAddLoader, setTriggerAddLoader ] = useState(false);
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
    stationId = stationId.toUpperCase();

    if (stations.length === 1) {
      addToast({
        type: 'error',
        title: 'ID: ' + stationId,
        description: 'Você não pode deletar a sua única estação.'
      });

      return
    }
      try {
        await api.delete<void>('/users/delete', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'stationId': stationId,
            'userId': user.id
          }
        });

        addToast({
          type: 'success',
          title: 'ID: ' + stationId,
          description: 'Estação removida com sucesso'
        });
        
        setStations(state => state.filter(station => station.stationID !== stationId));
      } catch {
        addToast({
          type: 'error',
          title: 'ID: ' + stationId,
          description: 'Algo deu errado. Recarrege a página e tente novamente'
        });

        return;
      }

  }, [user.id, token, addToast, stations]);

  const handleAddStation = useCallback(async (stationId: string | undefined): Promise<void> => {
    stationId = stationId?.toUpperCase();

    if (stationId === '') {
      addToast({
        type: 'error',
        title: 'ID Inválido',
        description: 'Preencha o campo corretamente.'
      });

      return;
    };
    
    const alreadyExists = stations.find(station => station.stationID === stationId);

    if (!!alreadyExists) {
      addToast({
        type: 'info',
        title: 'ID: ' + stationId,
        description: 'Estação já existente no acervo.'
      });

      return;
    } else {
      setTriggerAddLoader(true);
    }

    try {
      const response = await api.post('users/add', {
          stationId,
          userId: user.id
        },
        {headers: {
          'Authorization': `Bearer ${token}`
        }}
      );

      addToast({
        type: 'success',
        title: 'ID: ' + stationId,
        description: 'Estação adicionada com sucesso!'
      });

      setStations(oldStations => [...oldStations, response.data]);

    } catch {
      addToast({
        type: 'error',
        title: 'ID inválido',
        description: 'E estação não existe ou está temporariamente offline. Tente novamente mais tarde.'
      });
    }

    setTriggerAddLoader(false)
  }, [user.id, token, addToast, stations]);

  return (
    <>
      <Header currentPage='Dashboard' />
      {!stations.length
      ?
      <div style= {{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 130}}>
        <p style= {{marginBottom: 20, fontSize: '2.4rem'}}>Carregando estações</p>
        <Loader type='Circles' color='#3b5998' height={100} width={100} />
      </div> 
      :
      <Container triggerAddLoader={triggerAddLoader}>
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

        <button type='button' onClick={signOut} style={{backgroundColor: 'transparent'}}>Logout</button>
        
        <div>
          <input type="text" ref={inputRef} style={{color: 'black', marginBottom: 50}}/>
          <button type='button' onClick={() => handleAddStation(inputRef.current?.value)} style={{backgroundColor: 'black'}}>Adicionar</button>
        </div>

        <main>
          <p style= {{marginBottom: 20, fontSize: '2.4rem'}}>Aguarde</p>
          <Loader type='Circles' color='#3b5998' height={100} width={100} />
        </main> 
      </Container>
      }
    </>
  )
};

export default Dashboard;