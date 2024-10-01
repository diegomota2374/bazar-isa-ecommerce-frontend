"use client";

import { useFetchProducts } from "../api/Products.api";
import CardMidHome from "../components/CardMidHome/CardMidHome";
import CardPromoProduct from "../components/CardPromoProduct/CardPromoProduct";
import Carousel from "../components/Carousel/Carousel";
import CarouselProducts from "../components/CarouselProducts/CarouselProducts";
import CardProduct from "../components/CardProduct/CardProduct";
import { useCategory } from "../context/CategoryContext";

const Home: React.FC = () => {
  const { selectedCategory } = useCategory();
  const { products, error } = useFetchProducts();

  const discountedProducts = products
    .filter((product) => product.discount > 0)
    .slice(-3);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <div className="flex-grow pb-5">
        <Carousel />
      </div>
      {!selectedCategory && (
        <div className="pb-5">
          <CardMidHome />
        </div>
      )}
      {selectedCategory && (
        <div className="px-5 py-5">
          <h2 className="text-2xl font-bold mb-4">
            Produtos da categoria: {selectedCategory.toUpperCase()}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <CardProduct key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
      {!selectedCategory && (
        <>
          <CarouselProducts products={products} />

          <div className="py-5 px-2 mt-3 border-t-2  border-blue-300">
            <CardPromoProduct discountedProducts={discountedProducts} />
          </div>
        </>
      )}
    </>
  );
};
export default Home;
