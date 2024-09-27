"use client";

import { useFetchProducts } from "../api/Products.api";
import CardMidHome from "../components/CardMidHome/CardMidHome";
import CardProduct from "../components/CardProduct/CardProduct";
import Carousel from "../components/Carousel/Carousel";
import CarouselProducts from "../components/CarouselProducts/CarouselProducts";

export default function Home() {
  const { products, error } = useFetchProducts();

  return (
    <>
      <div className="flex-grow pb-5">
        <Carousel />
      </div>
      <div className="pb-5">
        <CardMidHome />
      </div>
      <CarouselProducts products={products} />
    </>
  );
}
