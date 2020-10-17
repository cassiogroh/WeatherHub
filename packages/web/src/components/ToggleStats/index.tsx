import React, { FormEvent, useMemo, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import InputOption from './InputOption';

import { Container, Options, AddStationForm } from './styles';

interface Request {
  handleInputCheck(value: boolean | undefined, name: string): void;
  handleAddStation?(event: FormEvent, inputValue: string): void;
}

const ToggleStats: React.FC<Request> = ({handleInputCheck, handleAddStation}: Request) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState('');

  const formattedDate = useMemo(() => {
    const date = format(
      Date.now(),
      `dd'/'MMM'/'yyyy 'às' HH':'mm 'h'`,
      { locale: ptBR }
    );

    return date;
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

      {
        handleAddStation &&
        <AddStationForm onSubmit={event => handleAddStation(event, inputValue)}>
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value.toUpperCase())}
            placeholder='Digite um ID'
          />

          <button
            type='submit'
          >
            <FiPlus size={20} color='#3b5998' strokeWidth={5} />
          </button>
        </AddStationForm>
      }

      <p>Sincronizado em {formattedDate}</p>
    </Container>
  )
}

export default ToggleStats;