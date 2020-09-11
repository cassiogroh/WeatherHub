import React from 'react';
import { FiTrash2, FiEdit, FiFrown } from 'react-icons/fi';

import { Container, CardStats, CardBottom } from './styles';

export interface StationProps {
  status: 'online' | 'offline';
  stationID: string;
  name: string;
  url: string;
  neighborhood?: string;
  dewpt?: number;
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

const StationCard = ({
  status,
  stationID,
  name,
  url,
  neighborhood,
  dewpt,
  elev,
  heatIndex,
  precipRate,
  precipTotal,
  pressure,
  temp,
  windChill,
  windGust,
  windSpeed
}: StationProps ) => {

  return (
    <>
      <Container>
        <CardStats>
          <a href={url}> { name } </a>

          {status === 'online' ?
          <>
            <p>Temperatura <span>{temp} °C</span></p>
            <p>Ponto de orvalho <span>{dewpt} °C</span></p>
            <p>Índice de calor <span>{heatIndex} °C</span></p>
            {/* <p>Sensação térmica <span>{windChill} °C</span></p>
            <p>Precipitação Total <span>{precipTotal} mm</span></p>
            <p>Taxa de precipitação <span>{precipRate} mm/h</span></p>
            <p>Rajada de vento <span>{windGust} km/h</span></p>
            <p>Velocidade do vento <span>{windSpeed} km/h</span></p>
            <p>Pressão atmosférica <span>{pressure} hPa</span></p>
            <p>Elevação <span>{elev} m</span></p> */}
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
            <button type='button'>
              <FiEdit size={23} />
            </button>
            <button type='button' >
              <FiTrash2 size={23} />
            </button>
          </div>
        </CardBottom>
      </Container>
    </>
  )
};

export default StationCard;