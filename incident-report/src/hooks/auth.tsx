import api from "@services/infrastructure/http/api";
import UserHTTPService from "@services/infrastructure/service/UserHTTPService";
import React, { useCallback, useEffect, useState } from "react";
import { createContext, ReactNode, useContext } from "react";

import Toast from 'react-native-toast-message';

interface IAuthContextData {
  signIn: (data: ILoginDTO) => Promise<void>;
  signOut: () => Promise<void>;
  user: UserProps;
}

interface UserProps {
  access_token: string;
}

interface ILoginDTO {
  email: string;
  password: string;
}


interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState({} as UserProps);

  const signIn = useCallback(async (data: ILoginDTO) => {
    try {
      const response = await UserHTTPService.login(data);

      api.defaults.headers[
        'Authorization'
      ] = `Bearer ${response?.data?.access_token}`;

      setUser(response?.data);
    } catch (error) {
      const message = error?.response?.data?.error;

      Toast.show({
        type: 'error',
        text1: message,
      });
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      api.defaults.headers[
        'Authorization'
      ] = ``;

      setUser({});
    } catch (error) {
      const message = error?.response?.data?.error;

      Toast.show({
        type: 'error',
        text1: message,
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      await signOut();
    })();
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth }