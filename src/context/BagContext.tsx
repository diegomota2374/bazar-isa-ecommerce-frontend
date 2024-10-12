"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

interface BagContextProps {
  bagProducts: { [key: string]: boolean }; // Cada produto pode ter uma quantidade
  addToBag: (productId: string) => void;
  removeFromBag: (productId: string) => void;
  loadBag: () => void;
}

const BagContext = createContext<BagContextProps | undefined>(undefined);

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
};

export const BagProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bagProducts, setBagProducts] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Função para carregar os produtos da sacola do cliente
  const loadBag = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/bag`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const bagItems = response.data;
        const bagMap: { [key: string]: boolean } = {};

        // Mapeando o array de strings de IDs corretamente
        bagItems.forEach((itemId: string) => {
          bagMap[itemId] = true; // Usando o itemId diretamente
        });

        setBagProducts(bagMap);
      } catch (error) {
        console.error("Erro ao carregar sacola", error);
        toast.error("Erro ao carregar a sacola. Tente novamente.");
      }
    }
  };

  // Função para adicionar um produto à sacola
  const addToBag = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Usuário não está logado.");
      return;
    }

    // Adiciona o produto à sacola, se ele não estiver presente
    if (!bagProducts[productId]) {
      setBagProducts((prev) => ({
        ...prev,
        [productId]: true,
      }));

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/bag/add`,
          { productId }
        );
        toast.success("Produto adicionado à sacola!");
      } catch (error) {
        toast.error("Erro ao adicionar produto à sacola. Tente novamente.");
        console.error("Erro ao adicionar à sacola", error);
      }
    } else {
      toast("Produto já está na sacola.");
    }
  };

  // Função para remover um produto da sacola
  const removeFromBag = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Usuário não está logado.");
      return;
    }

    const updatedBag = { ...bagProducts };
    delete updatedBag[productId];
    setBagProducts(updatedBag);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/bag/remove`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Produto removido da sacola!");
    } catch (error) {
      toast.error("Erro ao remover produto da sacola. Tente novamente.");
      console.error("Erro ao remover da sacola", error);
    }
  };

  useEffect(() => {
    loadBag();
  }, []);

  return (
    <BagContext.Provider
      value={{ bagProducts, addToBag, removeFromBag, loadBag }}
    >
      {children}
    </BagContext.Provider>
  );
};
