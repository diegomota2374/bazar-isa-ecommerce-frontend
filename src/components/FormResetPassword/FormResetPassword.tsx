"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface FormData {
  newPassword: string;
  confirmNewPassword: string;
}

const FormResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtendo o token da URL
  const token = searchParams.get("token");

  const urlApi = process.env.NEXT_PUBLIC_API_BASE_URL;

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Token inválido.");
      return;
    }

    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${urlApi}/clients/reset-password/${token}`,
        {
          newPassword: data.newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Senha redefinida com sucesso!");
        router.replace("/UserCliente");
      } else {
        toast.error("Erro ao redefinir senha. Tente novamente.");
      }
    } catch (error) {
      toast.error(`Erro ao redefinir senha: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-300 p-6 flex justify-center">
          <h1 className="text-gray-600 text-4xl font-bold">Isa Bazar</h1>
        </div>

        <div className="p-8 bg-white">
          <h2 className="text-center text-2xl font-semibold text-blue-300 mb-4">
            Redefinir Senha
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Digite sua nova senha abaixo.
          </p>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 text-sm"
            >
              Nova Senha
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Digite sua nova senha"
              {...register("newPassword", {
                required: "A nova senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres",
                },
              })}
              className={`w-full p-2 border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded mt-1`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}

            <label
              htmlFor="confirmNewPassword"
              className="block text-gray-700 text-sm"
            >
              Confirme sua Nova Senha
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              placeholder="Confirme sua nova senha"
              {...register("confirmNewPassword", {
                required: "A confirmação de senha é obrigatória",
                validate: (value) =>
                  value === watch("newPassword") || "As senhas não coincidem",
              })}
              className={`w-full p-2 border ${
                errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
              } rounded mt-1`}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmNewPassword.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-300 text-white py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
              disabled={loading}
            >
              {loading ? "Redefinindo..." : "Redefinir Senha"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormResetPassword;
