import { FiHeart, FiLoader } from "react-icons/fi";
import { Product } from "../../api/Products.api";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

interface CardProductProps {
  product: Product;
  isFavorited: boolean; // Prop para indicar se o produto é favorito
  onFavoriteToggle: (productId: string) => void; // Prop para alternar estado de favorito
}

const CardProduct: React.FC<CardProductProps> = ({
  product,
  isFavorited,
  onFavoriteToggle,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const urlApi = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Verifica se o cliente está logado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Função para adicionar ou remover o produto dos favoritos
  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      toast("Você precisa estar logado para favoritar produtos.");
      return;
    }
    setIsLoading(true);
    // Chama a função para alternar o estado de favoritos
    onFavoriteToggle(product._id);
    setIsLoading(false);
  };

  const imageUrl =
    typeof product.imgProduct === "string"
      ? product.imgProduct
      : "/path/to/default-image.jpg";

  return (
    <div className="relative ma-w-xs h-80 bg-white border rounded-lg shadow-lg overflow-hidden">
      {/* ícone de coração */}
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
      <Link href={`/Produto/${product._id}`} passHref>
        {/* imagem do produto */}
        <div className="relative h-48 w-full">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
      </Link>
      {/* conteudo do card */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h2>
        <p className="text-sm font-semibold text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 text-lg font-bold text-blue-400">
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
    </div>
  );
};

export default CardProduct;
