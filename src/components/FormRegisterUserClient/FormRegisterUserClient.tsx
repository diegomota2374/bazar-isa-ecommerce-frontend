"use client";

import { AuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const FormRegisterUserClient: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const router = useRouter();
  const { login } = useContext(AuthContext);

  const urlApi = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Função para verificar se o email já está registrado
  const checkEmailExists = async (email: string) => {
    try {
      const response = await fetch(`${urlApi}/clients/check-email-client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.exists; // true se o email já existe
      } else {
        toast.error("Erro ao verificar o e-mail.");
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar o e-mail:", error);
      toast.error("Erro ao verificar o e-mail.");
      return false;
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Verifica se o email já existe antes de continuar
      const emailExists = await checkEmailExists(data.email);

      if (emailExists) {
        toast.error("Este e-mail já está registrado. Tente outro.");
        return;
      }

      const response = await fetch(`${urlApi}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        login(token);
        toast.success("Conta criada com sucesso!");
        router.replace("/");
      } else {
        toast.error("Erro ao criar conta.");
      }
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error(`Erro ao criar conta: ${error}`);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-300 p-6 flex justify-center">
          <h1 className="text-gray-600 text-4xl font-bold">Isa Bazar</h1>
        </div>

        <div className="p-8 bg-white">
          <h2 className="text-center text-2xl font-semibold text-blue-300 mb-4">
            Criar Conta
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Preencha os dados abaixo para criar sua conta.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Container para duas colunas no modo desktop */}
            <div className="lg:flex lg:space-x-4">
              <div className="lg:w-1/2">
                {/* Nome */}
                <>
                  <label htmlFor="name" className="block text-gray-700 text-sm">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome"
                    {...register("name", { required: "O nome é obrigatório" })}
                    className={`w-full p-2 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded mt-1`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </>
              </div>

              <div className="lg:w-1/2">
                {/* Email */}
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
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded mt-1`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </>
              </div>
            </div>

            <div className="lg:flex lg:space-x-4">
              <div className="lg:w-1/2">
                {/* Telefone */}
                <>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-700 text-sm"
                  >
                    Telefone
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Digite seu telefone"
                    {...register("phoneNumber", {
                      required: "O telefone é obrigatório",
                    })}
                    className={`w-full p-2 border ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    } rounded mt-1`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </>
              </div>

              <div className="lg:w-1/2">
                {/* Endereço */}
                <>
                  <label
                    htmlFor="address"
                    className="block text-gray-700 text-sm"
                  >
                    Endereço
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Digite seu endereço"
                    {...register("address", {
                      required: "O endereço é obrigatório",
                    })}
                    className={`w-full p-2 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded mt-1`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </>
              </div>
            </div>

            <div className="lg:flex lg:space-x-4">
              <div className="lg:w-1/2">
                {/* Senha */}
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
                      minLength: {
                        value: 6,
                        message: "A senha deve ter pelo menos 6 caracteres",
                      },
                    })}
                    className={`w-full p-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded mt-1`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </>
              </div>

              <div className="lg:w-1/2">
                {/* Confirmação da senha */}
                <>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm"
                  >
                    Confirmar Senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    {...register("confirmPassword", {
                      required: "A confirmação de senha é obrigatória",
                      validate: (value) =>
                        value === password || "As senhas não coincidem",
                    })}
                    className={`w-full p-2 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded mt-1`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-300 text-white py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
            >
              Criar Conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegisterUserClient;
