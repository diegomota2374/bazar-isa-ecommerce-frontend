"use client";

import { useFavorites } from "@/src/context/FavoriteContext";
import CardProduct from "@/src/components/CardProduct/CardProduct";
import { useFetchProducts } from "@/src/api/Products.api";
import { useCategory } from "@/src/context/CategoryContext";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

const Favorites: React.FC = () => {
  const { favoritedProducts, toggleFavorite } = useFavorites();
  const { products, error } = useFetchProducts();
  const { searchTerm } = useCategory();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const favoriteProducts = products.filter(
    (product) => favoritedProducts[product._id]
  );

  // Aplicando a pesquisa nos produtos favoritos
  const filteredFavoriteProducts = favoriteProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavoriteToggle = async (productId: string) => {
    setIsLoading((prevState) => ({ ...prevState, [productId]: true }));

    await toggleFavorite(productId);

    setIsLoading((prevState) => ({ ...prevState, [productId]: false }));
  };

  return (
    <div className="px-5 py-5 min-h-[400px] lg:min-h-[580px]">
      <h2 className="text-2xl font-bold mb-4">Produtos Favoritos</h2>

      {filteredFavoriteProducts.length === 0 ? (
        <p>Você ainda não tem produtos favoritos.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredFavoriteProducts.map((product) => (
            <div key={product._id} className="relative">
              <CardProduct
                product={product}
                isFavorited={!!favoritedProducts[product._id]}
                onFavoriteToggle={() => handleFavoriteToggle(product._id)}
              />
              {isLoading[product._id] && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-200 opacity-50">
                  <FiLoader className="animate-spin text-blue-500" size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
