"use client";

import { useParams } from "next/navigation";
import { useFetchProductById } from "../../../api/Products.api";
import { useFavorites } from "../../../context/FavoriteContext";
import { motion } from "framer-motion";
import { FiHeart, FiLoader } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "sonner"; // Para notificações de login

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { product, error } = useFetchProductById(id as string);
  const { favoritedProducts, toggleFavorite } = useFavorites(); // Gerencia favoritos
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (error) {
    return <div>Erro ao carregar o produto.</div>;
  }

  if (!product) {
    return <div>Carregando...</div>;
  }

  const isFavorited = !!favoritedProducts[product._id]; // Verifica se está favoritado
  const imageUrl =
    typeof product.imgProduct === "string"
      ? product.imgProduct
      : "/path/to/default-image.jpg";

  // Função para alternar o estado de favorito
  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      toast("Você precisa estar logado para favoritar produtos.");
      return;
    }

    setIsLoading(true);
    toggleFavorite(product._id); // Alterna o favorito
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-5 flex justify-center lg:min-h-[580px]">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-3/4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagem do Produto */}
          <div className="relative w-full h-[300px] flex justify-center items-center border border-gray-200 rounded-lg">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full  h-full  object-cover rounded-lg"
              style={{ maxWidth: "100%", maxHeight: "100%" }} // Tamanho fixo
            />

            {/* Coração de Favorito */}
            <div className="absolute z-10 top-2 right-2">
              <motion.button
                whileTap={{ scale: 1.5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-gray-400 hover:text-blue-500 focus:outline-none"
                onClick={handleFavoriteClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiLoader className="text-blue-400" size={24} />
                  </motion.div>
                ) : isFavorited ? (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaHeart className="text-blue-400" size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiHeart size={24} />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>

          {/* Detalhes do Produto */}
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold ">{product.name}</h1>
            {/* Estado do Produto */}
            <div>
              Estado:
              <span className="text-lg font-semibold text-blue-400 ml-2">
                {product.state}
              </span>
            </div>

            <p className="text-gray-700">{product.description}</p>
            {/* Tamanho do Produto */}
            <div>
              Tamanho:
              <span className="text-lg font-semibold text-blue-400 ml-2">
                {product.size}
              </span>
            </div>

            {product.discount > 0 ? (
              <div className="text-red-500 text-xl">
                <span className="line-through text-gray-500">
                  R$ {product.price.toFixed(2)}
                </span>{" "}
                R$ {(product.price * (1 - product.discount / 100)).toFixed(2)}
              </div>
            ) : (
              <div className="text-xl">R$ {product.price.toFixed(2)}</div>
            )}
            <button className="bg-blue-400 text-white px-4 py-2 rounded mt-4 hover:bg-blue-500">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
