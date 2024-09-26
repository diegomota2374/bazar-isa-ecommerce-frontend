import { Variants, motion } from "framer-motion";

export const hamburgerLineVariants: Variants = {
  initial: { rotate: 0, y: 8, opacity: 1 },
  openTop: { rotate: 45, y: 0, opacity: 1 },
  openMiddle: { opacity: 0 }, // linha do meio desaparece
  openBottom: { rotate: -45, y: 0, opacity: 1 },
  closedTop: { rotate: 0, y: 8, opacity: 1 },
  closedMiddle: { y: 0, opacity: 1 },
  closedBottom: { rotate: 0, y: -8, opacity: 1 },
};

interface HamburgerButtonProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <div className="md:hidden flex items-center">
      <button
        className="relative w-12 h-12 flex items-center justify-center"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menu"
      >
        <motion.div
          className="absolute w-6 h-0.5 bg-gray-950"
          variants={hamburgerLineVariants}
          initial="initial"
          animate={isMenuOpen ? "openTop" : "closedTop"}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute w-6 h-0.5 bg-gray-950"
          variants={hamburgerLineVariants}
          initial="initial"
          animate={isMenuOpen ? "openMiddle" : "closedMiddle"}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute w-6 h-0.5 bg-gray-950"
          variants={hamburgerLineVariants}
          initial="initial"
          animate={isMenuOpen ? "openBottom" : "closedBottom"}
          transition={{ duration: 0.3 }}
        />
      </button>
    </div>
  );
};
export default HamburgerButton;
