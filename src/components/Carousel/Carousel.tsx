"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CarouselItem {
  id: number;
  src: string;
  alt: string;
}

const carouselItems: CarouselItem[] = [
  { id: 1, src: "/carousel/bazar-isa-carousel1.jpg", alt: "Slide 1" },
  { id: 2, src: "/carousel/bazar-isa-carousel2.jpg", alt: "Slide 2" },
  { id: 3, src: "/carousel/bazar-isa-carousel3.jpg", alt: "Slide 3" },
];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-36 overflow-hidden md:h-96">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            data-carousel-item
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="absolute block w-full h-full object-fill"
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
