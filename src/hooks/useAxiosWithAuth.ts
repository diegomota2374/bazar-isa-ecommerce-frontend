import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const useAxiosWithAuth = () => {
  const { logout } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Certifique-se de que esta variável está configurada
  });

  // Intercepta as respostas para verificar erros de autenticação
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout(); // Chama a função de logout do AuthContext
        toast.error("Sua sessão expirou. Faça login novamente."); // Mostra a notificação
      }
      return Promise.reject(error); // Rejeita a promessa com o erro
    }
  );

  return axiosInstance;
};

export default useAxiosWithAuth;
