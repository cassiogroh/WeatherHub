import React from 'react';

import './StationCard.css';

const StationCard = () => {
  return (
    <div className='station-card'>

      <div className="card-top">
        <a href="sdf">Tomaz Coelho</a>
        <button type='button' />
      </div>

      <p>Temperatura: 13 °C</p>
      <p>Precip. Total: 0 mm</p>
      <p>Vel. do vento: 1.8 km/h</p>

      <div className="card-bottom">
        <p>ID: ISANTACA2</p>
        <button type='button' />
      </div>

    </div>
  )
};

export default StationCard;