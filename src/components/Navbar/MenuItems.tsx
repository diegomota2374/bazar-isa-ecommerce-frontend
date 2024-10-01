import { useFetchProducts } from "@/src/api/Products.api";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface MenuItemsProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hideBackgroundOnDesktop?: boolean;
  setSelectedCategory: (category: string) => void;
}

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const MenuItems: React.FC<MenuItemsProps> = ({
  setIsMenuOpen,
  hideBackgroundOnDesktop,
  setSelectedCategory,
}) => {
  const { products } = useFetchProducts();
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Função para mover o scroll horizontalmente
  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainer.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className={`flex items-center justify-center p-4 ${
        hideBackgroundOnDesktop
          ? "md:bg-transparent md:shadow-none"
          : "bg-blue-300 shadow-lg"
      }`}
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
    >
      {/* Layout para telas maiores (desktop) */}
      <div className="hidden md:flex items-center justify-center">
        {/* Botão de seta para a esquerda */}
        <button onClick={() => scroll("left")} className="p-2">
          <FiChevronLeft className="text-2xl text-gray-800" />
        </button>

        {/* Contêiner da lista de categorias com rolagem horizontal */}
        <div
          className="flex items-center justify-center overflow-x-auto whitespace-nowrap scrollbar-hide"
          ref={scrollContainer}
        >
          {products.map((product) => (
            <button
              key={product._id}
              onClick={() => {
                setIsMenuOpen(false);
                setSelectedCategory(product.category);
              }}
              className="px-4 py-2 mx-2 text-gray-950 hover:bg-gray-400 rounded whitespace-nowrap"
            >
              {product.category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Botão de seta para a direita */}
        <button onClick={() => scroll("right")} className="p-2">
          <FiChevronRight className="text-2xl text-gray-800" />
        </button>
      </div>

      {/* Layout simples para telas menores (mobile) */}
      <div className="md:hidden flex flex-col">
        {products.map((product) => (
          <button
            key={product._id}
            onClick={() => {
              setIsMenuOpen(false);
              setSelectedCategory(product.category);
            }}
            className="px-4 py-2 my-1 text-gray-950 hover:bg-gray-400 rounded"
          >
            {product.category.toUpperCase()}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default MenuItems;
