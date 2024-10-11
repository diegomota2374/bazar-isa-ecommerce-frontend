"use client";

import { useFetchProducts } from "../api/Products.api";
import CardMidHome from "../components/CardMidHome/CardMidHome";
import CardPromoProduct from "../components/CardPromoProduct/CardPromoProduct";
import Carousel from "../components/Carousel/Carousel";
import CarouselProducts from "../components/CarouselProducts/CarouselProducts";
import CardProduct from "../components/CardProduct/CardProduct";
import { useCategory } from "../context/CategoryContext";
import { useFavorites } from "../context/FavoriteContext";

const Home: React.FC = () => {
  const { selectedCategory, searchTerm } = useCategory();
  const { products, error } = useFetchProducts();
  const { favoritedProducts, toggleFavorite } = useFavorites();

  const discountedProducts = products
    .filter((product) => product.discount > 0)
    .slice(-3);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearchTerm = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesSearchTerm;
  });

  return (
    <>
      <div className="flex-grow pb-5">
        <Carousel />
      </div>
      {!selectedCategory && !searchTerm && (
        <div className="pb-5">
          <CardMidHome />
        </div>
      )}
      {(selectedCategory || searchTerm) && (
        <div className="px-5 py-5">
          <h2 className="text-2xl font-bold mb-4">
            Produtos{" "}
            {selectedCategory &&
              `da categoria: ${selectedCategory.toUpperCase()} `}
            {searchTerm && `relacionados à: "${searchTerm}"`}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <CardProduct
                key={product._id}
                product={product}
                isFavorited={!!favoritedProducts[product._id]} // Passa se está favoritado
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
      {!selectedCategory && !searchTerm && (
        <>
          <CarouselProducts products={products} />

          <div className="p-10 mt-3 border-t-2  border-blue-300">
            <CardPromoProduct discountedProducts={discountedProducts} />
          </div>
        </>
      )}
    </>
  );
};
export default Home;
