import React from 'react';
import Header from '../../components/Header/Header';
import StationCard from '../../components/StationCard/StationCard';

import './Home.css';

const Home = () => {
  return (
    <>
      <Header />

      <div className="station-card-grid">
        <StationCard />
        <StationCard />
        <StationCard />
      </div>
    </>
  )
};

export default Home;