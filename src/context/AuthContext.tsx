"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

// Definindo o formato do contexto
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Criando o contexto com um valor inicial padrão
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Provider para envolver a aplicação e fornecer o estado global
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Efeito para verificar se o usuário está logado no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Função para efetuar o login e atualizar o estado global
  const login = (token: string) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  // Função para efetuar o logout
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
