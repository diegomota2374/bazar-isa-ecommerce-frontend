"use client";

import { cloneElement, useState } from "react";
import Loading from "../app/loading";
import { Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";

interface ClientProviderProps {
  children: React.ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Navbar setSelectedCategory={setSelectedCategory} />
      <Suspense fallback={<Loading />}>
        {cloneElement(children as React.ReactElement, { selectedCategory })}
      </Suspense>
    </>
  );
};

export default ClientProvider;
