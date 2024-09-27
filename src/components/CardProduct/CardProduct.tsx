import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { Product } from "../../api/Products.api";

interface CardProductProps {
  product: Product;
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  const imageUrl =
    typeof product.imgProduct === "string"
      ? product.imgProduct
      : "/path/to/default-image.jpg";

  return (
    <div className="relative ma-w-xs h-80 bg-white border rounded-lg shadow-lg overflow-hidden">
      {/* icone de coração */}
      <div className="absolute z-10 top-2 right-2">
        <button className="text-gray-400  hover:text-red-500 focus:outline-none">
          <FiHeart size={24} />
        </button>
      </div>
      {/* imagem do produto */}
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      {/* conteudo do card */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.description}
        </h2>
        <div className="mt-2 text-lg font-bold text-blue-400">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};
export default CardProduct;
