"use client";

import { AnimatePresence, motion } from "framer-motion";
import HamburgerButton from "./HamburgerButton";
import { useState } from "react";
import MenuItems from "./MenuItems";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="relative w-full top-0 left-0 z-50 flex items-center justify-between flex-col px-2 py-2 bg-blue-300  border-b-2 border-gray-400 shadow-md">
      <div className="flex items-center w-full justify-between px-4 ">
        <HamburgerButton
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <div className="text-start mt-[-25px] ml-[-15px]">
          <Image
            src="/logo-bazar-isa.svg"
            alt="Logo Bazar Isa"
            width={180}
            height={40}
            priority={true}
          />
        </div>
        <div className="text-gray-950 text-2xl">
          <FiShoppingBag />
        </div>
      </div>

      <div className="flex w-full items-center px-4">
        <div className="flex items-center">
          <FiUser className="text-gray-950 text-4xl pl-3 mr-10" />
        </div>
        <input
          type="text"
          placeholder="Pesquisar..."
          className="flex-grow p-2 border border-gray-300 rounded"
        />
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-14 left-0 w-full bg-gray-950 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <MenuItems setIsMenuOpen={setIsMenuOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
