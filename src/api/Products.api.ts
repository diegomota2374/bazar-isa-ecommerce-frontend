import axios from "axios";
import { useEffect, useState } from "react";

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  size: string;
  discount: number;
  status: string;
  state: string;
  imgProduct: FileList;
}

const urlApi = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

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

export const useFetchProductById = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${urlApi}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Erro ao buscar o produto.");
        } else {
          setError("Erro desconhecido");
        }
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, error };
};
