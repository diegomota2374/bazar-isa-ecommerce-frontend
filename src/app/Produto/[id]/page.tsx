"use client";

import { useParams } from "next/navigation";
import { useFetchProductById } from "../../../api/Products.api";
import { useFavorites } from "../../../context/FavoriteContext";
import { motion } from "framer-motion";
import { FiHeart, FiLoader } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Modal from "react-modal";
import { useBag } from "@/src/context/BagContext";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { product, error } = useFetchProductById(id as string);
  const { favoritedProducts, toggleFavorite } = useFavorites();
  const { bagProducts, addToBag, loadBag } = useBag();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductInBag, setIsProductInBag] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    loadBag();
  }, []);

  useEffect(() => {
    if (product && bagProducts) {
      setIsProductInBag(!!bagProducts[product._id]);
    }
  }, [product, bagProducts]);

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

  const handleAddToBag = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("Você precisa estar logado para adicionar a sacola.");
    } else {
      await addToBag(product._id);
      setIsModalOpen(true);
    }
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
            <div className="absolute z-5 top-2 right-2">
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
            <button
              className={`${
                isProductInBag
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-400 hover:bg-blue-500"
              } text-white px-4 py-2 rounded mt-4`}
              onClick={handleAddToBag}
            >
              {isProductInBag ? "Ver Sacola" : "Adicionar à Sacola"}
            </button>
          </div>
        </div>
      </div>
      {/* Modal de confirmação */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" // Fundo escuro e centralização
        overlayClassName="fixed inset-0 bg-black bg-opacity-10" // Estilo de overlay
      >
        <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Produto adicionado à sacola
            </h2>
            <span>{Object.keys(bagProducts).length} item(ns) na sacola</span>
          </div>

          <div className="flex items-center justify-evenly gap-4">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              {/* Estado do Produto */}
              <div>
                Estado:
                <span className="text-lg font-semibold text-blue-400 ml-2">
                  {product.state}
                </span>
              </div>
              {/* Tamanho do Produto */}
              <div>
                Tamanho:
                <span className="text-lg font-semibold text-blue-400 ml-2">
                  {product.size}
                </span>
              </div>
              {product.discount > 0 ? (
                <div className="text-red-500 text-sm">
                  <span className="line-through text-gray-500">
                    R$ {product.price.toFixed(2)}
                  </span>{" "}
                  R$ {(product.price * (1 - product.discount / 100)).toFixed(2)}
                </div>
              ) : (
                <div className="text-xl">R$ {product.price.toFixed(2)}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-end gap-4 mt-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Continuar comprando
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                window.location.href = "/bag"; // Redireciona para a página da sacola
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ver sacola
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
