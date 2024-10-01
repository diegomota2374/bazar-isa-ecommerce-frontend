"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextProps {
  selectedCategory: string | null;
  searchTerm: string;
  setSelectedCategory: (category: string | null) => void;
  setSearchTerm: (term: string) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
