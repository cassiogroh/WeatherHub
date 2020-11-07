import React, { useState, useEffect, useCallback, FormEvent, useMemo } from 'react';
import Loader from 'react-loader-spinner';
// import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import ProfileHeader from '../../components/ProfileHeader';
import ToggleStats from '../../components/ToggleStats';
import StationCard, { StationCurrentProps, StationHistoricProps, ViewProps } from '../../components/StationCard';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, StationsStats } from './styles';

const Dashboard: React.FC = () => {
  // const history = useHistory();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [ stationsCurrent, setStationsCurrent ] = useState<StationCurrentProps[]>([]);
  const [ stationsHistoric, setStationsHistoric ] = useState<Array<StationHistoricProps[]>>([]);
  const [ triggerAddLoader, setTriggerAddLoader ] = useState(false);

  // ToggleStats component
  const [toggleInputSlider, setToggleInputSlider] = useState(false);
  const [currentHistoricDay, setCurrentHistoricDay] = useState(0);
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
    // .catch(err => {
    //   localStorage.removeItem('@WeatherHub:token');
    //   localStorage.removeItem('@WeatherHub:user');
    //   history.push('/signin');

    //   addToast({
    //     type: 'info',
    //     title: 'A sessão expirou.',
    //     description: 'Faça login novamente.'
    //   });
    // });
  }, []);

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

  const data = useMemo(() => {
    interface dataInfo {
      low: string;
      max: string;
      prec: string;
    }
    let d: dataInfo[] = [] as dataInfo[];

    try {
      stationsHistoric.map((stationData, index) => {
        d.push({
          low: String(stationData[currentHistoricDay].tempLow).replace(/\./g, ','),
          max: String(stationData[currentHistoricDay].tempHigh).replace(/\./g, ','),
          prec: Number(stationsCurrent[index].precipTotal) === 0 ? '' : String(stationsCurrent[index].precipTotal).replace(/\./g, ',')
        });
        return true;
      });
    } catch (err) {};

    let formattedData = '';

    if (d.length >= 12) formattedData = `${d[0].low};${d[0].max};;${d[0].prec};;;${d[1].low};${d[1].max};;${d[1].prec};;;${d[2].low};${d[2].max};;${d[2].prec};;;${d[3].low};${d[3].max};;${d[3].prec};;;${d[4].low};${d[4].max};;${d[4].prec};;;;;;;;${d[5].low};${d[5].max};;${d[5].prec};;;${d[6].low};${d[6].max};;${d[6].prec};;;${d[7].low};${d[7].max};;${d[7].prec};;;;;;;;${d[8].low};${d[8].max};;${d[8].prec};;;;;${d[9].low};${d[9].max};;${d[9].prec};;;;;${d[10].low};${d[10].max};;${d[10].prec};;;${d[11].low};${d[11].max};;${d[11].prec}`;

    return formattedData;
  }, [stationsHistoric, stationsCurrent, currentHistoricDay]);

  const copyData = useCallback(() => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = data;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    
    if (stationsCurrent.length >= 12) {
      addToast({
        type: 'success',
        title: 'Dados copiados!'
      });
    } else {
      addToast({
        type: 'error',
        title: 'Erro ao copiar',
        description: 'Organize as 12 estações para copiar os dados.'
      });
    }

  }, [stationsCurrent, data, addToast]);

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
          copyData={copyData}
          currentHistoricDay={currentHistoricDay}
          setCurrentHistoricDay={setCurrentHistoricDay}
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
              currentHistoricDay={currentHistoricDay + 6}
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