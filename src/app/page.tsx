"use client";

import { useFetchProducts } from "../api/Products.api";
import CardMidHome from "../components/CardMidHome/CardMidHome";
import CardPromoProduct from "../components/CardPromoProduct/CardPromoProduct";
import Carousel from "../components/Carousel/Carousel";
import CarouselProducts from "../components/CarouselProducts/CarouselProducts";
import { CardPromo } from "../mocks/mocks";

export default function Home() {
  const { products, error } = useFetchProducts();

  const discountedProducts = products
    .filter((product) => product.discount > 0)
    .slice(-3);

  return (
    <>
      <div className="flex-grow pb-5">
        <Carousel />
      </div>
      <div className="pb-5">
        <CardMidHome />
      </div>
      <CarouselProducts products={products} />

      <div className="py-5 px-2 mt-3 border-t-2  border-blue-300">
        <CardPromoProduct discountedProducts={discountedProducts} />
      </div>
    </>
  );
}
