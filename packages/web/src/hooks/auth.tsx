import  React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { decode } from 'jsonwebtoken';

interface User {
  id: string,
  name: string,
  email: string,
  stations: string[],
  stations_names: string[],
  created_at: Date
};

interface AuthState {
  token: string;
  user: User;
};

interface SignInCredentials {
  email: string;
  password: string;
};

interface TokenProps {
  exp: number;
  iat: number;
  sub: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [ data, setData ] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      const verifyExpiration = decode(token) as TokenProps;
      
      if (verifyExpiration.exp < Date.now()) {
        localStorage.clear();
        history.push('/signin')
      };

      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);

    history.push('/');
  }, [history]);
  
  const updateUser = useCallback((user: User) => {
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({
      token: data.token,
      user
    })
  }, [setData, data.token]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}