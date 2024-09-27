import { useFetchProducts } from "@/src/api/Products.api";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface MenuItemsProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  status: string;
  state: string;
  imgProduct: FileList;
}

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const MenuItems: React.FC<MenuItemsProps> = ({ setIsMenuOpen }) => {
  const { products, error } = useFetchProducts();
  return (
    <motion.div
      className="flex flex-col p-4 bg-blue-300 shadow-lg"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
    >
      {products.map((product) => (
        <button
          key={product._id}
          onClick={() => {
            setIsMenuOpen(false);
          }}
          className="block px-4 py-2 text-gray-950 hover:bg-gray-400"
        >
          {product.category.toUpperCase()}
        </button>
      ))}
    </motion.div>
  );
};
export default MenuItems;
