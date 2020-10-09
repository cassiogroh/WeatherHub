import React, { useState, useCallback, useRef } from 'react';

import { FiTrash2, FiEdit, FiFrown, FiEdit3 } from 'react-icons/fi';

import api from '../../services/api';

import { Container, CardStats, CardBottom, RenameField } from './styles';

export interface ViewProps {
  temp: boolean,
  dewpt: boolean,
  heatIndex: boolean,
  windChill: boolean,
  humidity: boolean,
  precipTotal: boolean,
  precipRate: boolean,
  windGust: boolean,
  windSpeed: boolean,
  pressure: boolean,
  elev: boolean,
}

export interface StationProps {
  status: 'online' | 'offline';
  stationID: string;
  name: string;
  url: string;
  neighborhood?: string;
  dewpt?: number;
  humidity?: number;
  elev?: number;
  heatIndex?: number;
  precipRate?: number;
  precipTotal?: number;
  pressure?: number;
  temp?: number;
  windChill?: number;
  windGust?: number;
  windSpeed?: number;
}

export interface RequestProps {
  station: StationProps;
  propsView?: ViewProps;
  handleDeleteStation?: any;
  user?: object;
}

const StationCard: React.FC<RequestProps> = ({
  station,
  propsView,
  handleDeleteStation,
  user
}: RequestProps ) => {

  const {
    status,
    stationID,
    name,
    url,
    // neighborhood,
    dewpt,
    humidity,
    elev,
    heatIndex,
    precipRate,
    precipTotal,
    pressure,
    temp,
    windChill,
    windGust,
    windSpeed
  } = station;

  const [inputFocus, setInputFocus] = useState(false);
  const [renameButtonFocus, setRenameButtonFocus] = useState(false);
  const [deleteButtonFocus, setDeleteButtonFocus] = useState(false);
  const [rename, setRename] = useState(false);
  const [stationName, setStationName] = useState(name);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleRenameStation = useCallback(() => {
    setRename(!rename);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 5)
  }, [rename]);

  const confirmRenameStation = 
  useCallback(async (stationId: string, newName: string | undefined, currentName: string): Promise<void> => {
    if (currentName !== newName && newName !== '') {
      await api.put('/users/stations', {
          stationId,
          newName,
        }
      );
      
      !!newName && setStationName(newName);
    };

    setRename(false);
  }, []);

  const handleFocus = useCallback((focusedVariable: string) => {
    switch (focusedVariable) {
      case 'renameInput':
        return setInputFocus(true);
      case 'renameButton':
        return setRenameButtonFocus(true);
      case 'deleteButton':
        return setDeleteButtonFocus(true);
      default:
        return null;
    };
  }, []);

  const handleBlur = useCallback((focusedVariable: string) => {
    switch (focusedVariable) {
      case 'renameInput': {
        confirmRenameStation(stationID, inputRef.current?.value, stationName);
        return setInputFocus(false);
      }
      case 'renameButton':
        return setRenameButtonFocus(false);
      case 'deleteButton':
        return setDeleteButtonFocus(false);
      default:
        return null;
    }
  }, [confirmRenameStation, stationID, stationName]);

  return (
    <Container>
        <CardStats>
          {rename ?
          <RenameField inputFocus={inputFocus}>
            <input
              ref={inputRef}
              defaultValue={stationName}
              type='text'
              onFocus={() => handleFocus('renameInput')}
              onBlur={() => handleBlur('renameInput')}
            />
            <button
              type='button'
              onClick={() => confirmRenameStation(stationID, inputRef.current?.value, stationName)}
            >
              <FiEdit3 stroke={inputFocus ? '#3FCA87' : '#ddd'} />
            </button>
          </RenameField>
          : <a href={url} target='blank'> { stationName } </a>
          }          
          
          {status === 'online' && !!propsView ?
          <>
            { propsView.temp && <p>Temperatura <span>{temp} °C</span></p>}
            { propsView.dewpt && <p>Ponto de orvalho <span>{dewpt} °C</span></p>}
            { propsView.heatIndex && <p>Índice de calor <span>{heatIndex} °C</span></p>}
            { propsView.windChill && <p>Sensação térmica <span>{windChill} °C</span></p>}
            { propsView.humidity && <p>Humidade relativa <span>{humidity} %</span></p>}
            { propsView.precipTotal && <p>Precipitação Total <span>{precipTotal} mm</span></p>}
            { propsView.precipRate && <p>Taxa de precipitação <span>{precipRate} mm/h</span></p>}
            { propsView.windGust && <p>Rajada de vento <span>{windGust} km/h</span></p>}
            { propsView.windSpeed && <p>Velocidade do vento <span>{windSpeed} km/h</span></p>}
            { propsView.pressure && <p>Pressão atmosférica <span>{pressure} hPa</span></p>}
            { propsView.elev && <p>Elevação <span>{elev} m</span></p>}
          </> :
          <div>
            <p>Estação offline</p>
            <FiFrown size={50} />
          </div>
        }
        </CardStats>

        <CardBottom>
          <p>ID: {stationID} </p>
          
          {!!user && 
          <div>
            <button
              onClick={handleRenameStation}
              onMouseEnter={() => handleFocus('renameButton')}
              onMouseLeave={() => handleBlur('renameButton')}
              type='button'>
              <FiEdit size={23} stroke={renameButtonFocus ? '#3FCA87' : '#ddd'} />
            </button>
            <button
              onClick={(() => handleDeleteStation(stationID))}
              onMouseEnter={() => handleFocus('deleteButton')}
              onMouseLeave={() => handleBlur('deleteButton')}
              type='button' >
              <FiTrash2 size={23} stroke={deleteButtonFocus ? '#FF9077' : '#ddd'} />
            </button>
          </div>
          }
        </CardBottom>
    </Container>
  )
};

export default StationCard;