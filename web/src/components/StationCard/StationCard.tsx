import React from 'react';

import './StationCard.css';

export interface StationProps {
  neighborhood: string;
  stationID: string;
  dewpt: number;
  elev: number;
  heatIndex: number;
  precipRate: number;
  precipTotal: number;
  pressure: number;
  temp: number;
  windChill: number;
  windGust: number;
  windSpeed: number;
}

const StationCard = ({
  neighborhood,
  stationID,
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
    <div className='station-card'>

      <div className="card-top">
        <a href="sdf"> { neighborhood } </a>
        <button type='button' />
      </div>

      <p>Temperatura: {temp} °C</p>
      <p>Precip. Total: {precipTotal} mm</p>
      <p>Vel. do vento: {windSpeed} km/h</p>

      <div className="card-bottom">
        <p>ID: {stationID} </p>
        <button type='button' />
      </div>

    </div>
  )
};

export default StationCard;