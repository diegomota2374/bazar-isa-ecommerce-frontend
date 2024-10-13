import { useBag } from "@/src/context/BagContext";
import { IoTrashBinOutline } from "react-icons/io5";

interface CartItemProps {
  productId: string;
  name: string;
  state: string;
  size: string;
  price: number;
  discount: number;
  image: FileList;
}

const CartItem: React.FC<CartItemProps> = ({
  productId,
  name,
  state,
  size,
  price,
  discount,
  image,
}) => {
  const { removeFromBag } = useBag();

  // Cálculo do preço final após aplicar o desconto
  const discountedPrice = price - price * (discount / 100);

  const imageUrl =
    typeof image === "string" ? image : "/path/to/default-image.jpg";

  return (
    <div className="relative flex items-center p-4 border-b border-gray-200">
      {/* Imagem do produto */}
      <img src={imageUrl} alt={name} className="w-20 h-20 mr-4" />

      {/* Detalhes do produto */}
      <div className="flex-1">
        <h4 className="text-lg font-semibold">{name}</h4>
        <p>Estado: {state}</p>
        <p>Tamanho: {size}</p>
        {/* Exibir preço original e com desconto */}
        {discount > 0 ? (
          <div>
            <p className="line-through text-gray-500">
              Valor: R$ {price.toFixed(2)}
            </p>
            <p className="text-red-600">
              Com desconto: R$ {discountedPrice.toFixed(2)}
            </p>
          </div>
        ) : (
          <p>Valor: R$ {price.toFixed(2)}</p>
        )}
      </div>

      {/* Botão para remover o produto */}
      <button
        className="absolute top-5 right-5 text-gray-600 hover:text-red-700"
        onClick={() => removeFromBag(productId)}
      >
        <IoTrashBinOutline size={20} />
      </button>
    </div>
  );
};

export default CartItem;
