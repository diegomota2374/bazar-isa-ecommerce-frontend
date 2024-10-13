"use client";
import CartItem from "@/src/components/CartItem/CartItem";
import { useBag } from "@/src/context/BagContext";
import Link from "next/link";

const Cart: React.FC = () => {
  const { bagProducts } = useBag();

  const totalItems = Object.keys(bagProducts).length;

  // Calcular o valor total dos produtos com desconto
  const totalPrice = Object.values(bagProducts).reduce((acc, product) => {
    const discountedPrice =
      product.price - product.price * (product.discount / 100);
    return acc + discountedPrice;
  }, 0);

  return (
    <div className="max-w-2x1 max-auto p-6">
      <div className="flex gap-5 px-5">
        <h1 className="text-3x1 font-bold mb-4">Sacola</h1>
        <h2 className="text-lg mb-6 text-blue-400">
          {totalItems} ite{totalItems !== 1 ? "ns" : "m"}
        </h2>
      </div>

      <div className="bg-white rounded shadow-md mb-6">
        {Object.entries(bagProducts).map(([productId, product]) => (
          <CartItem
            key={productId}
            productId={productId}
            name={product.name}
            state={product.state}
            size={product.size}
            price={product.price}
            discount={product.discount}
            image={product.imgProduct}
          />
        ))}
      </div>

      <div className="bg-white rounded shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Resumo da Compra</h2>
        <div className="flex flex-col mb-4">
          {Object.entries(bagProducts).map(([productId, product]) => (
            <div key={productId} className="flex justify-between mb-2">
              <span>{product.name}</span>
              <span>
                {product.price - product.price * (product.discount / 100)}
              </span>
            </div>
          ))}
        </div>

        {/* Linha separadora */}
        <hr className="my-4 border-gray-300" />

        {/* Valor total dos produtos */}
        <div className="flex justify-between items-center font-semibold text-lg mb-5">
          <span>Total:</span>
          <span>R$ {totalPrice.toFixed(2)}</span>
        </div>

        <button className="w-full py-2 bg-blue-400 text-white rounded hover:bg-blue-500">
          Continuar
        </button>
        <Link href={`/`} passHref>
          <button className="w-full py-2 mt-2 bg-gray-300 text-black rounded hover:bg-gray-400">
            Comprar mais produtos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
