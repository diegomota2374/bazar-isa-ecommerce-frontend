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
    <nav className="relative w-full top-0 left-0 z-50 flex flex-col lg:flex-row lg:items-center lg:justify-between px-2 py-2 bg-blue-300  shadow-md">
      {/* Primeira linha: Logo e ícones */}
      <div className="flex items-center justify-between w-full md:w-auto px-4 md:px-6">
        {/* Botão Hamburger - visível apenas em telas menores */}
        <div className="lg:hidden">
          <HamburgerButton
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        {/* Logo */}
        <div className="flex items-center mt-[-10px]  md:mt-[-20px]">
          <Image
            src="/logo-bazar-isa.svg"
            alt="Logo Bazar Isa"
            width={180}
            height={40}
            priority={true}
          />
        </div>
      </div>

      <div className="hidden lg:flex md:flex-1 lg:justify-center">
        <MenuItems
          setIsMenuOpen={setIsMenuOpen}
          hideBackgroundOnDesktop={true}
        />
      </div>

      {/* Segunda linha: Campo de pesquisa e ícones */}
      <div className="flex w-full md:w-auto items-center justify-between px-4 py-2 md:py-0 md:px-6">
        {/* Campo de pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar..."
          className="flex-grow p-2 border border-gray-300 rounded w-full md:w-96"
        />

        {/* Ícones de carrinho e usuário */}
        <div className="flex items-center md:ml-4">
          <FiShoppingBag className="text-gray-950 text-2xl md:text-3xl ml-2 cursor-pointer" />
          <FiUser className="text-gray-950 text-2xl md:text-3xl ml-4 cursor-pointer" />
        </div>
      </div>

      {/* Menu dropdown para telas menores (hamburger) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-14 left-0 w-full bg-gray-950 shadow-lg md:hidden"
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
