import React, {
  InputHTMLAttributes,
  useRef
} from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  propName: string;
  handleInputCheck(value: boolean | undefined, name: string): void;
  checked?: boolean;
}

const InputOption: React.FC<InputProps> = ({ name, propName, handleInputCheck, checked = false}) => {
  const inputRef =  useRef<HTMLInputElement>(null);

  return (
    <Container>
      <input
        type='checkbox'
        ref={inputRef}
        onClick={() => handleInputCheck(inputRef.current?.checked, propName)}
        defaultChecked={checked}
      />
      {name}
    </Container>
  )
}

export default InputOption
