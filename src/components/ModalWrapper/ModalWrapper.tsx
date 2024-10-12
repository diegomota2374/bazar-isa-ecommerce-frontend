"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";

const ModalWrapper: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Agora sabemos que estamos no cliente
  }, []);

  useEffect(() => {
    if (isClient) {
      const checkAppElement = setInterval(() => {
        const appElement = document.getElementById("__next");
        if (appElement) {
          Modal.setAppElement(appElement as HTMLElement); // Fazendo type assertion para HTMLElement
          clearInterval(checkAppElement); // Limpa o intervalo quando o elemento é encontrado
        }
      }, 100); // Tente a cada 100ms
    }
  }, [isClient]);

  return null; // Não precisa renderizar nada aqui
};

export default ModalWrapper;
