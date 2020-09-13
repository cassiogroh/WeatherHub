import React, { useCallback } from 'react';

import InputOption from './InputOption';

import { Container, Options } from './styles';

interface Request {
  handleInputCheck(value: boolean | undefined, name: string): void;
}

const ToggleStats: React.FC<Request> = ({handleInputCheck}) => {
  
  const getDate = useCallback((): string  => {
    const date = new Date();
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formatedDate = date.toLocaleDateString('pt-BR', options);
    return formatedDate;
  }, [])

  return (
    <Container>
      <Options>
        <p>Opções de visualização</p>
      
        <InputOption name='Temperatura' propName={'temp'} handleInputCheck={handleInputCheck} checked={true} />
        <InputOption name='Ponto de orvalho' propName={'dewpt'} handleInputCheck={handleInputCheck} />
        <InputOption name='Índice de calor' propName={'heatIndex'} handleInputCheck={handleInputCheck} />
        <InputOption name='Sensação térmica' propName={'windChill'} handleInputCheck={handleInputCheck} />
        <InputOption name='Humidade relativa' propName={'humidity'} handleInputCheck={handleInputCheck} checked={true} />
        <InputOption name='Precipitação total' propName={'precipTotal'} handleInputCheck={handleInputCheck} checked={true} />
        <InputOption name='Taxa de precipitação' propName={'precipRate'} handleInputCheck={handleInputCheck} />
        <InputOption name='Rajada de vento' propName={'windGust'} handleInputCheck={handleInputCheck} />
        <InputOption name='Velocidade do vento' propName={'windSpeed'} handleInputCheck={handleInputCheck} />
        <InputOption name='Pressão atmosférica' propName={'pressure'} handleInputCheck={handleInputCheck} />
        <InputOption name='Elevação' propName={'elev'} handleInputCheck={handleInputCheck} />
      </Options>

      <p>Sincronizado em {getDate()} h</p>
    </Container>
  )
}

export default ToggleStats;