import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import ProfileHeader from '../../components/ProfileHeader';
import ToggleStats from '../../components/ToggleStats';
import StationCard, { StationCurrentProps, StationHistoricProps, ViewProps } from '../../components/StationCard';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, StationsStats } from './styles';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [ stationsCurrent, setStationsCurrent ] = useState<StationCurrentProps[]>([]);
  const [ stationsHistoric, setStationsHistoric ] = useState<StationHistoricProps[]>([]);
  const [ triggerAddLoader, setTriggerAddLoader ] = useState(false);

  // ToggleStats component
  const [toggleInputSlider, setToggleInputSlider] = useState(false);
  const [minStatus, setMinStatus] = useState(true);
  const [medStatus, setMedStatus] = useState(false);
  const [maxStatus, setMaxStatus] = useState(true);
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
  
  useEffect(() => {
    api.get('/users/stations').then(response => {
      setStationsCurrent(response.data[0]);
      setStationsHistoric(response.data[1]);
    })
    .catch(err => {
      localStorage.removeItem('@WeatherHub:token');
      localStorage.removeItem('@WeatherHub:user');
      history.push('/signin');

      addToast({
        type: 'info',
        title: 'A sessão expirou.',
        description: 'Faça login novamente.'
      });
    });
  }, [user.id, history, addToast]);

  const handleInputCheck = useCallback((value: boolean, propName: keyof(typeof propsView)): void => {
    const changedPropsView = {...propsView};
    changedPropsView[propName] = value;

    setPropsView(changedPropsView);
  }, [propsView]);

  const handleDeleteStation = useCallback(async (stationId: string): Promise<void> => {
    stationId = stationId.toUpperCase();

    if (stationsCurrent.length === 1) {
      addToast({
        type: 'error',
        title: 'ID: ' + stationId,
        description: 'Você não pode deletar a sua única estação.'
      });

      return
    }
      try {
        await api.delete<void>('/users/stations', {
          headers: {
            'stationId': stationId
          }
        });

        addToast({
          type: 'success',
          title: 'ID: ' + stationId,
          description: 'Estação removida com sucesso'
        });
        
        setStationsCurrent(state => state.filter(station => station.stationID !== stationId));
      } catch {
        addToast({
          type: 'error',
          title: 'ID: ' + stationId,
          description: 'Algo deu errado. Recarrege a página e tente novamente'
        });

        return;
      }

  }, [addToast, stationsCurrent]);

  const handleAddStation = useCallback(async (event: FormEvent, stationId: string): Promise<void> => {
    event.preventDefault();

    if (stationId === '') {
      addToast({
        type: 'error',
        title: 'ID Inválido',
        description: 'Preencha o campo corretamente.'
      });

      return;
    };
    
    const alreadyExists = stationsCurrent.find(station => station.stationID === stationId);

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
      const response = await api.post('users/stations', {
        stationId
      });

      addToast({
        type: 'success',
        title: 'ID: ' + stationId,
        description: 'Estação adicionada com sucesso!'
      });

      console.log(response.data)

      setStationsCurrent(oldStations => [...oldStations, response.data[0][0]]);
      setStationsHistoric(oldStations => [...oldStations, response.data[1][1]]);

    } catch {
      addToast({
        type: 'error',
        title: 'ID inválido',
        description: 'E estação não existe ou está temporariamente offline. Tente novamente mais tarde.'
      });
    }

    setTriggerAddLoader(false)
  }, [addToast, stationsCurrent]);

  return (
    <>
      <Header currentPage='Painel do usuário' />
      <ProfileHeader currentPage='Estações' />

      {!stationsCurrent.length
      ?
      <div style= {{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 130}}>
        <p style= {{marginBottom: 20, fontSize: '2.4rem'}}>Carregando estações</p>
        <Loader type='Circles' color='#3b5998' height={100} width={100} />
      </div> 
      :
      <Container triggerAddLoader={triggerAddLoader}>
        <ToggleStats
          handleInputCheck={handleInputCheck}
          handleAddStation={handleAddStation}
          toggleInputSlider={toggleInputSlider}
          setToggleInputSlider={setToggleInputSlider}
          minStatus={minStatus}
          setMinStatus={setMinStatus}
          medStatus={medStatus}
          setMedStatus={setMedStatus}
          maxStatus={maxStatus}
          setMaxStatus={setMaxStatus}
        />

        <StationsStats>
          {stationsCurrent.map((station: StationCurrentProps, index: number) => (
            <StationCard
              key={station.stationID}
              currentData={station}
              historicData={stationsHistoric[index]}
              propsView={station.status === 'online' ? propsView : undefined}
              handleDeleteStation={handleDeleteStation}
              user={user}
              currentOrHistoric={toggleInputSlider}
              minStatus={minStatus}
              medStatus={medStatus}
              maxStatus={maxStatus}
            />
          )
          )}
        </StationsStats>

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