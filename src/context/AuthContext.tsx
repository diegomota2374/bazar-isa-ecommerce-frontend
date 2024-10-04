"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

interface Client {
  _id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

// Definindo o formato do contexto
interface AuthContextType {
  isLoggedIn: boolean;
  client: Client | null;
  login: (token: string, userData: Client) => void;
  logout: () => void;
  updateUser: (updateUser: Client) => void;
}

// Criando o contexto com um valor inicial padrão
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  client: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

// Provider para envolver a aplicação e fornecer o estado global
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [client, setClient] = useState<Client | null>(null);

  // Efeito para verificar se o usuário está logado no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("client");
    if (token) {
      setIsLoggedIn(true);

      // Verificar se o storedUser existe e é uma string válida
      try {
        if (storedUser) {
          setClient(JSON.parse(storedUser)); // Apenas faz o parse se o user existir
        } else {
          setClient(null); // Define como null se o usuário não existir
        }
      } catch (error) {
        console.error("Erro ao fazer parse do storedUser:", error);
        setClient(null); // Caso o JSON seja inválido, limpar o usuário
      }
    } else {
      setIsLoggedIn(false);
      setClient(null);
    }
  }, []);

  // Função para efetuar o login e atualizar o estado global
  const login = (token: string, clientData: Client) => {
    setIsLoggedIn(true);
    setClient(clientData);
    localStorage.setItem("token", token);
    localStorage.setItem("client", JSON.stringify(clientData));
  };

  // Função para efetuar o logout
  const logout = () => {
    setIsLoggedIn(false);
    setClient(null);
    localStorage.removeItem("token");
    localStorage.removeItem("client");
  };

  // Função para atualizar as informações do usuário
  const updateUser = (updatedClient: Client) => {
    setClient(updatedClient);
    localStorage.setItem("client", JSON.stringify(updatedClient));
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, client, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
