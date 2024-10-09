import Slider from "react-slick";
import CardProduct from "./../CardProduct/CardProduct";
import { Product } from "../../api/Products.api";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useFavorites } from "@/src/context/FavoriteContext";

interface CarouselProps {
  products: Product[];
}

// Componente de Skeleton para o carregamento
const SkeletonProductCard = () => {
  return (
    <div className="p-4 animate-pulse bg-gray-200 rounded-md h-[300px] w-full">
      <div className="h-32 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
    </div>
  );
};

// Componente para a seta "anterior"
const PreviousArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} slick-prev-custom`}
      onClick={onClick}
      aria-label="Previous"
    >
      <FaAngleLeft color="gray" />
    </button>
  );
};

// Componente para a seta "próximo"
const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} slick-next-custom`}
      onClick={onClick}
      aria-label="Next"
    >
      <FaAngleRight color="gray" />
    </button>
  );
};

const CarouselProducts: React.FC<CarouselProps> = ({ products }) => {
  const [loading, setLoading] = useState(true);
  const { favoritedProducts, toggleFavorite } = useFavorites();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="p-8 overflow-hidden">
      <Slider {...settings}>
        {loading
          ? [1, 2, 3, 4].map((_, index) => (
              <div key={index} className="px-2">
                <SkeletonProductCard />
              </div>
            ))
          : products.map((product) => (
              <div key={product._id} className="px-2">
                <CardProduct
                  product={product}
                  isFavorited={!!favoritedProducts[product._id]} // Verifica se o produto é favorito
                  onFavoriteToggle={toggleFavorite} // Passa a função para alternar favoritos
                />
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default CarouselProducts;
