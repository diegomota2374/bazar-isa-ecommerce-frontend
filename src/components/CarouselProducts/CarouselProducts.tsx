import Slider from "react-slick";
import CardProduct from "./../CardProduct/CardProduct";
import { Product } from "../../api/Products.api";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface CarouselProps {
  products: Product[];
}

// Componente para a seta "anterior"
const PreviousArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} slick-prev-custom  `}
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
      className={`${className} slick-next-custom  `}
      onClick={onClick}
      aria-label="Next"
    >
      <FaAngleRight color="gray" />
    </button>
  );
};

const CarouselProducts: React.FC<CarouselProps> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <CardProduct product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselProducts;
