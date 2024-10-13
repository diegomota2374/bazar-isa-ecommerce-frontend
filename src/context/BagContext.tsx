"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Product } from "../api/Products.api";

interface BagContextProps {
  bagProducts: { [key: string]: Product };
  addToBag: (productId: Product) => void;
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
  const [bagProducts, setBagProducts] = useState<{ [key: string]: Product }>(
    {}
  );

  // Função para carregar os produtos da sacola do cliente
  const loadBag = async () => {
    const storedBag = localStorage.getItem("bagProducts");
    if (storedBag) {
      setBagProducts(JSON.parse(storedBag));
    }
  };

  // Função para adicionar um produto à sacola
  const addToBag = async (product: Product) => {
    if (!bagProducts[product._id]) {
      setBagProducts((prev) => {
        const updatedBag = { ...prev, [product._id]: product };
        localStorage.setItem("bagProducts", JSON.stringify(updatedBag));
        return updatedBag;
      });
      toast.success("Produto adicionado à sacola!");
    } else {
      toast("Produto já está na sacola.");
    }
  };

  // Função para remover um produto da sacola
  const removeFromBag = async (productId: string) => {
    setBagProducts((prev) => {
      const updatedBag = { ...prev };
      delete updatedBag[productId];
      localStorage.setItem("bagProducts", JSON.stringify(updatedBag));
      return updatedBag;
    });
    toast.success("Produto removido da sacola!");
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
