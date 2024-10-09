"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import useAxiosWithAuth from "../hooks/useAxiosWithAuth";

interface FavoriteContextProps {
  favoritedProducts: { [key: string]: boolean };
  toggleFavorite: (productId: string) => void;
  loadFavorites: () => void;
}

const FavoriteContext = createContext<FavoriteContextProps | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoritedProducts, setFavoritedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  const axiosWithAuth = useAxiosWithAuth();

  // Função para carregar os favoritos da API
  const loadFavorites = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axiosWithAuth.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/favorites`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const favorites = response.data;
        const favoritesMap: { [key: string]: boolean } = {};

        favorites.forEach((favorite: { _id: string }) => {
          favoritesMap[favorite._id] = true;
        });

        setFavoritedProducts(favoritesMap);
      } catch (error) {
        console.error("Erro ao carregar favoritos", error);
      }
    }
  };

  // Função para alternar o estado de favorito de um produto
  const toggleFavorite = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const isCurrentlyFavorited = !!favoritedProducts[productId];
    setFavoritedProducts((prev) => ({
      ...prev,
      [productId]: !isCurrentlyFavorited,
    }));

    try {
      if (!isCurrentlyFavorited) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/favorites/add`,
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Produto adicionado aos favoritos!");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/favorites/remove`,
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Produto removido dos favoritos!");
      }
    } catch (error) {
      toast.error("Erro ao atualizar os favoritos. Tente novamente.");
      console.error("Erro ao atualizar favoritos", error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{ favoritedProducts, toggleFavorite, loadFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
