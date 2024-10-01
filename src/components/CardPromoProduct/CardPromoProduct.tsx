import { useEffect, useState, useRef } from "react";
import ColorThief from "colorthief";
import { Product } from "@/src/api/Products.api";

interface CardPromoProps {
  discountedProducts: Product[];
}

const CardPromoProduct: React.FC<CardPromoProps> = ({ discountedProducts }) => {
  const [bgColors, setBgColors] = useState<string[]>([]);
  const [textColors, setTextColors] = useState<string[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const colorThief = useRef(new ColorThief()).current;
  const lastThreeProducts = discountedProducts.slice(-3);

  const isDarkColor = (rgb: number[]) => {
    const [r, g, b] = rgb;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  useEffect(() => {
    const extractColor = (imgElement: HTMLImageElement, index: number) => {
      try {
        const color = colorThief.getColor(imgElement);
        const bgColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        const textColor = isDarkColor(color) ? "white" : "black";

        // Atualizar a cor de fundo e a cor do texto
        setBgColors((prevColors) => {
          if (prevColors[index] !== bgColor) {
            const newColors = [...prevColors];
            newColors[index] = bgColor;
            return newColors;
          }
          return prevColors;
        });

        setTextColors((prevTextColors) => {
          const newTextColors = [...prevTextColors];
          newTextColors[index] = textColor;
          return newTextColors;
        });
      } catch (error) {
        console.error("Error extracting color:", error);
        // Defina uma cor de fallback se a extração de cor falhar
        setBgColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[index] = "gray"; // Cor de fallback
          return newColors;
        });
        setTextColors((prevTextColors) => {
          const newTextColors = [...prevTextColors];
          newTextColors[index] = "black"; // Cor de fallback
          return newTextColors;
        });
      }
    };

    const handleLoad = (event: Event, index: number) => {
      const imgElement = event.target as HTMLImageElement;
      extractColor(imgElement, index);
    };

    imgRefs.current.forEach((imgElement, index) => {
      if (imgElement) {
        if (imgElement.complete) {
          extractColor(imgElement, index);
        } else {
          imgElement.addEventListener("load", (event) =>
            handleLoad(event, index)
          );
        }
      }
    });

    return () => {
      imgRefs.current.forEach((imgElement) => {
        if (imgElement) {
          imgElement.removeEventListener("load", (event) =>
            handleLoad(event, 0)
          );
        }
      });
    };
  }, [discountedProducts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {lastThreeProducts.map((product, index) => {
        const priceWithDiscount = product.price - product.discount;
        const imageUrl =
          typeof product.imgProduct === "string"
            ? product.imgProduct
            : "/path/to/default-image.jpg";

        return (
          <div
            key={product._id}
            className="rounded-lg shadow-md p-4 text-white"
            style={{
              backgroundColor: bgColors[index] || "gray",
              color: textColors[index] || "black",
            }} // Cor de fundo para cada produto
          >
            <div className="relative w-full h-48">
              <img
                src={imageUrl}
                alt={product.name}
                className="object-cover rounded-t-lg w-full h-full" // Garantir que as imagens tenham o mesmo tamanho
                ref={(el) => {
                  imgRefs.current[index] = el; // Atribuir o elemento à referência correta
                }}
                crossOrigin="anonymous" // Necessário para o ColorThief funcionar
              />
            </div>

            <div className="mt-4">
              <h2
                className="text-xl font-semibold"
                style={{ color: textColors[index] || "black" }}
              >
                {product.name}
              </h2>
              <p
                className="text-sm"
                style={{ color: textColors[index] || "black" }}
              >
                {product.description}
              </p>
              <div
                className="mt-2 text-lg font-bold "
                style={{ color: textColors[index] || "black" }}
              >
                <span className="line-through text-gray-400">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div
                className="mt-2 text-lg font-bold text-blue-400"
                style={{ color: textColors[index] || "black" }}
              >
                ${priceWithDiscount.toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardPromoProduct;
