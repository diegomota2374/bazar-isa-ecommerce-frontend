// pages/Favorites.tsx
"use client";

import { useFavorites } from "@/src/context/FavoriteContext";
import CardProduct from "@/src/components/CardProduct/CardProduct";
import { useFetchProducts } from "@/src/api/Products.api";
import { useCategory } from "@/src/context/CategoryContext";

const Favorites: React.FC = () => {
  const { favoritedProducts } = useFavorites();
  const { products, error } = useFetchProducts();
  const { searchTerm } = useCategory();

  const favoriteProducts = products.filter(
    (product) => favoritedProducts[product._id]
  );

  // Aplicando a pesquisa nos produtos favoritos
  const filteredFavoriteProducts = favoriteProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-5 py-5">
      <h2 className="text-2xl font-bold mb-4">Produtos Favoritos</h2>

      {filteredFavoriteProducts.length === 0 ? (
        <p>Você ainda não tem produtos favoritos.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredFavoriteProducts.map((product) => (
            <CardProduct
              key={product._id}
              product={product}
              isFavorited={true}
              onFavoriteToggle={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
