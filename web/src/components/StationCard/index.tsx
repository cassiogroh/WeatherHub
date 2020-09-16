import React from 'react';
import { FiTrash2, FiEdit, FiFrown } from 'react-icons/fi';

import { Container, CardStats, CardBottom } from './styles';

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
  propsView?: ViewProps;
  handleEditStationName?: any;
  handleDeleteStation?: any;
}

const StationCard: React.FC<StationProps> = ({
  status,
  stationID,
  name,
  url,
  neighborhood,
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
  windSpeed,
  propsView,
  handleEditStationName,
  handleDeleteStation
}: StationProps ) => {
  return (
    <Container>
        <CardStats>
          <a href={url}> { name } </a>
          {status === 'online' ?
          <>
            { propsView?.temp && <p>Temperatura <span>{temp} °C</span></p>}
            { propsView?.dewpt && <p>Ponto de orvalho <span>{dewpt} °C</span></p>}
            { propsView?.heatIndex && <p>Índice de calor <span>{heatIndex} °C</span></p>}
            { propsView?.windChill && <p>Sensação térmica <span>{windChill} °C</span></p>}
            { propsView?.humidity && <p>Humidade relativa <span>{humidity} %</span></p>}
            { propsView?.precipTotal && <p>Precipitação Total <span>{precipTotal} mm</span></p>}
            { propsView?.precipRate && <p>Taxa de precipitação <span>{precipRate} mm/h</span></p>}
            { propsView?.windGust && <p>Rajada de vento <span>{windGust} km/h</span></p>}
            { propsView?.windSpeed && <p>Velocidade do vento <span>{windSpeed} km/h</span></p>}
            { propsView?.pressure && <p>Pressão atmosférica <span>{pressure} hPa</span></p>}
            { propsView?.elev && <p>Elevação <span>{elev} m</span></p>}
          </> :          
          <div>
            <p>Estação offline</p>
            <FiFrown size={50} />
          </div>
        }
        </CardStats>

        <CardBottom>
          <p>ID: {stationID} </p>
          
          <div>
            <button onClick={handleEditStationName && (() => handleEditStationName(stationID))} type='button'>
              <FiEdit size={23} />
            </button>
            <button onClick={handleDeleteStation && (() => handleDeleteStation(stationID))} type='button' >
              <FiTrash2 size={23} />
            </button>
          </div>
        </CardBottom>
    </Container>
  )
};

export default StationCard;