import axios from "axios";
import { useEffect, useState } from "react";

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  status: string;
  state: string;
  imgProduct: FileList;
}

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const urlApi = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Função para buscar produtos da API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${urlApi}/products`);
      setProducts(response.data);
    } catch (err) {
      setError("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, error };
};
