"use client";
import { AnimatePresence, motion } from "framer-motion";
import HamburgerButton from "./HamburgerButton";
import { useContext, useState } from "react";
import MenuItems from "./MenuItems";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import Image from "next/image";
import { useCategory } from "@/src/context/CategoryContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthContext } from "@/src/context/AuthContext";
import { FaUserCheck } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { setSelectedCategory, setSearchTerm } = useCategory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const router = useRouter();

  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Foi feito o logout com sucesso!");
    setIsUserMenuOpen(false);
    router.replace("/");
  };

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
          <Link href={"/"} passHref>
            <Image
              src="/logo-bazar-isa.svg"
              alt="Logo Bazar Isa"
              width={180}
              height={40}
              priority={true}
              onClick={() => {
                setSelectedCategory(null);
                setSearchTerm("");
              }}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>

      <div className="hidden lg:flex md:flex-1 lg:justify-center">
        <MenuItems
          setIsMenuOpen={setIsMenuOpen}
          hideBackgroundOnDesktop={true}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Segunda linha: Campo de pesquisa e ícones */}
      <div className="flex w-full md:w-auto items-center justify-between px-4 py-2 md:py-0 md:px-6">
        {/* Campo de pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar..."
          className="flex-grow p-2 border border-gray-300 rounded w-full md:w-96"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Ícones de carrinho e usuário */}
        <div className="flex items-center md:ml-4">
          <FiShoppingBag className="text-gray-950 text-2xl md:text-3xl ml-2 cursor-pointer" />
          {isLoggedIn ? (
            <>
              <FaUserCheck
                className="text-gray-950 text-2xl md:text-3xl ml-4 cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />

              {/* Menu suspenso quando o usuário está logado */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-blue-300 rounded-md shadow-lg"
                    initial={{ opacity: 0, y: +20 }}
                    animate={{ opacity: 1, y: 90 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href="/favorites" passHref>
                      <p className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Produtos Favoritos
                      </p>
                    </Link>
                    <Link href="/edit-profile" passHref>
                      <p className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Editar Dados
                      </p>
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link href="/UserCliente" passHref>
              <FiUser className="text-gray-950 text-2xl md:text-3xl ml-4 cursor-pointer" />
            </Link>
          )}
        </div>
      </div>

      {/* Menu dropdown para telas menores (hamburger) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-14 left-0 w-full bg-gray-950 shadow-lg md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 80 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <MenuItems
              setIsMenuOpen={setIsMenuOpen}
              setSelectedCategory={setSelectedCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
