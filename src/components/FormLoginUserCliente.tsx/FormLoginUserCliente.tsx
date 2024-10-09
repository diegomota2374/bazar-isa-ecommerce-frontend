// src/components/FormLoginUserCliente.tsx

"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import FormRegisterUserClient from "../FormRegisterUserClient/FormRegisterUserClient";
import { toast } from "sonner";
import { AuthContext } from "@/src/context/AuthContext";
import { useFavorites } from "@/src/context/FavoriteContext";

interface FormData {
  email: string;
  password?: string;
}

const FormLoginUserCliente: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const [emailExists, setEmailExists] = useState(false);
  const [emailExistsForm, setEmailExistsForm] = useState(true);
  const [emailForReset, setEmailForReset] = useState("");

  const { loadFavorites } = useFavorites();

  const { login: loginContext } = useContext(AuthContext);

  const urlApi = process.env.NEXT_PUBLIC_API_BASE_URL;

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const checkEmailExists = async (email: string) => {
    try {
      const response = await axios.post(
        `${urlApi}/clients/check-email-client`,
        {
          email: email,
        }
      );

      if (response.status === 200) {
        return response.data.exists;
      }

      return false;
    } catch (error) {
      toast.error(`Erro ao verificar email: ${error} `);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${urlApi}/clients/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const { token, client } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("client", JSON.stringify(client));
        loginContext(token, client);

        return true;
      }
      return false;
    } catch (error) {
      toast.error(`Erro ao fazer login ${error} `);
      return false;
    }
  };

  const onSubmit = async (data: FormData) => {
    const emailExists = await checkEmailExists(data.email);
    if (data.password) {
      const loginSuccess = await login(data.email, data.password);
      if (loginSuccess) {
        toast.success("Login realizado com sucesso!");
        await loadFavorites();
        router.replace("/");
      } else {
        toast.error("Erro ao fazer login. Verifique suas credenciais.");
      }
    } else {
      if (emailExists) {
        setEmailExists(true);
        setEmailForReset(data.email);
      } else {
        setEmailExists(false);
        setEmailExistsForm(false);
      }
    }
  };

  // Função para lidar com a solicitação de redefinição de senha
  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${urlApi}/clients/forgot-password`, {
        email: emailForReset,
      });
      if (response.status === 200) {
        toast.success(
          "Email de recuperação enviado! Verifique sua caixa de entrada."
        );
      }
    } catch (error) {
      toast.error(`Erro ao enviar email de recuperação: ${error}`);
    }
  };

  return (
    <>
      {emailExistsForm === false || mode === "edit" ? (
        <FormRegisterUserClient />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-300 p-6 flex justify-center">
              <h1 className="text-gray-600 text-4xl font-bold">Isa Bazar</h1>
            </div>

            <div className="p-8 bg-white">
              <h2 className="text-center text-2xl font-semibold text-blue-300 mb-4">
                Acesso
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Para acessar sua conta ou criar uma nova, insira seu email.
              </p>

              {/* Formulário */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    {...register("email", {
                      required: "O email é obrigatório",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Digite um email válido",
                      },
                    })}
                    className={`w-full p-2 border ${
                      errors.email
                        ? "border-red-500"
                        : emailExists
                        ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                        : "border-gray-300"
                    } rounded mt-1`}
                    readOnly={emailExists}
                  />

                  {/* Exibição do erro de validação */}
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                  {/* Campo de Senha, exibido se o e-mail existir */}
                  {emailExists && (
                    <>
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm"
                      >
                        Senha
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        {...register("password", {
                          required: "A senha é obrigatória",
                        })}
                        className={`w-full p-2 border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } rounded mt-1`}
                      />

                      {/* Exibição do erro de validação para a senha */}
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </>
                  )}
                </>
                {/* Botão de Acessar */}
                <button
                  type="submit"
                  className="w-full bg-blue-300 text-white py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
                >
                  Acessar
                </button>
                {emailExists && (
                  <button
                    type="button"
                    onClick={() => handleForgotPassword()}
                    className="text-blue-500 mt-2"
                  >
                    Esqueci a senha
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormLoginUserCliente;
